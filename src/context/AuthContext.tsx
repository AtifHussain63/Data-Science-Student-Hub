import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import {
  UserProfile,
  Bookmark,
  StudentNote,
  QuizScore,
  SubjectId,
  Topic
} from '../types';

interface LocalUserRecord {
  password?: string;
  profile: UserProfile;
}

interface AuthContextType {
  currentUser: User | { uid: string; email: string | null; displayName: string | null; isDemo?: boolean } | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isDemoMode: boolean;
  completedTopics: string[];
  bookmarks: Bookmark[];
  notes: StudentNote[];
  quizScores: QuizScore[];
  theme: 'light' | 'dark';
  signup: (
    email: string,
    pass: string,
    fullName: string,
    university: string,
    degree: string,
    semester: string
  ) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  loginAsDemo: (customProfile?: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateStudentProfile: (updates: Partial<UserProfile>) => Promise<void>;
  toggleTheme: () => Promise<void>;
  toggleTopicCompletion: (topicId: string, subjectId: SubjectId) => Promise<void>;
  toggleBookmark: (topic: Topic) => Promise<void>;
  isBookmarked: (topicId: string) => boolean;
  isTopicCompleted: (topicId: string) => boolean;
  addNote: (
    title: string,
    content: string,
    subjectId: SubjectId | 'general',
    topicId?: string,
    topicTitle?: string
  ) => Promise<string>;
  updateNote: (id: string, updates: { title?: string; content?: string; subjectId?: SubjectId | 'general' }) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  saveQuizScore: (
    subjectId: SubjectId,
    subjectTitle: string,
    score: number,
    totalQuestions: number
  ) => Promise<void>;
}

const LOCAL_SESSION_KEY = 'ds_student_session';
const LOCAL_USERS_KEY = 'ds_student_registered_users';
const LOCAL_PROGRESS_KEY = 'ds_local_progress';
const LOCAL_BOOKMARKS_KEY = 'ds_local_bookmarks';
const LOCAL_NOTES_KEY = 'ds_local_notes';
const LOCAL_SCORES_KEY = 'ds_local_scores';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<
    User | { uid: string; email: string | null; displayName: string | null; isDemo?: boolean } | null
  >(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<StudentNote[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('ds_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  // Apply theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ds_theme', theme);
  }, [theme]);

  // Load Local Storage Student Data helper
  const loadLocalStudentData = () => {
    try {
      const savedProfile = localStorage.getItem(LOCAL_SESSION_KEY) || localStorage.getItem('ds_demo_session');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile) as UserProfile;
        
        // Ensure latest avatar from cache if available
        if (profile.email) {
          const cachedAvatar = localStorage.getItem('ds_avatar_' + profile.email.toLowerCase().trim());
          if (cachedAvatar && (!profile.avatarUrl || profile.avatarUrl.includes('dicebear'))) {
            profile.avatarUrl = cachedAvatar;
          }
        }
        
        setUserProfile(profile);
        setCurrentUser({
          uid: profile.uid,
          email: profile.email,
          displayName: profile.fullName,
          isDemo: true
        });
        setIsDemoMode(true);
      }

      const savedProgress = localStorage.getItem(LOCAL_PROGRESS_KEY);
      if (savedProgress) {
        setCompletedTopics(JSON.parse(savedProgress));
      }

      const savedBookmarks = localStorage.getItem(LOCAL_BOOKMARKS_KEY);
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }

      const savedNotes = localStorage.getItem(LOCAL_NOTES_KEY);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }

      const savedScores = localStorage.getItem(LOCAL_SCORES_KEY);
      if (savedScores) {
        setQuizScores(JSON.parse(savedScores));
      }
    } catch (e) {
      console.error('Error loading local student data:', e);
    }
  };

  // Helper to persist user profile & avatar to local accounts store
  const persistUserToLocalStorage = (email: string, profile: UserProfile, password?: string) => {
    if (!email) return;
    const normalizedEmail = email.toLowerCase().trim();
    try {
      const raw = localStorage.getItem(LOCAL_USERS_KEY);
      const usersMap: Record<string, LocalUserRecord> = raw ? JSON.parse(raw) : {};
      const existing = usersMap[normalizedEmail];
      
      const updatedProfile: UserProfile = {
        ...existing?.profile,
        ...profile
      };

      // If existing had an avatar and incoming is default/empty, keep existing avatar
      if (existing?.profile?.avatarUrl && (!profile.avatarUrl || profile.avatarUrl.includes('dicebear'))) {
        updatedProfile.avatarUrl = existing.profile.avatarUrl;
      }

      usersMap[normalizedEmail] = {
        password: password || existing?.password,
        profile: updatedProfile
      };
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(usersMap));

      if (updatedProfile.avatarUrl) {
        localStorage.setItem('ds_avatar_' + normalizedEmail, updatedProfile.avatarUrl);
        localStorage.setItem('ds_avatar_last_saved', updatedProfile.avatarUrl);
        if (updatedProfile.uid) {
          localStorage.setItem('ds_avatar_' + updatedProfile.uid, updatedProfile.avatarUrl);
        }
      }
      localStorage.setItem('ds_profile_' + normalizedEmail, JSON.stringify(updatedProfile));
    } catch (e) {
      console.warn('Error persisting user record to localStorage:', e);
    }
  };

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setIsDemoMode(false);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          const emailKey = (user.email || '').toLowerCase().trim();
          const cachedAvatar = emailKey
            ? (localStorage.getItem('ds_avatar_' + emailKey) || localStorage.getItem('ds_avatar_' + user.uid) || localStorage.getItem('ds_avatar_last_saved'))
            : localStorage.getItem('ds_avatar_last_saved');

          if (docSnap.exists()) {
            const data = docSnap.data() as UserProfile;
            
            // If firestore doc has no avatar or default bot, but local cache has a custom photo, merge it
            if ((!data.avatarUrl || data.avatarUrl.includes('dicebear')) && cachedAvatar) {
              data.avatarUrl = cachedAvatar;
              try {
                await updateDoc(userDocRef, { avatarUrl: cachedAvatar });
              } catch (err) {
                console.warn('Could not sync cached avatar back to Firestore:', err);
              }
            } else if (data.avatarUrl && emailKey) {
              localStorage.setItem('ds_avatar_' + emailKey, data.avatarUrl);
              localStorage.setItem('ds_avatar_last_saved', data.avatarUrl);
            }

            setUserProfile(data);
            if (emailKey) {
              persistUserToLocalStorage(emailKey, data);
            }
            if (data.theme && data.theme !== theme) {
              setTheme(data.theme);
            }
          } else {
            // Initialize basic profile, honoring any previously saved avatar
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              fullName: user.displayName || 'Data Science Student',
              university: 'University Student',
              degree: 'B.S. Data Science',
              semester: 'Semester 3',
              avatarUrl: user.photoURL || cachedAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email || 'student')}`,
              theme: 'light',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            try {
              await setDoc(userDocRef, newProfile);
            } catch (err) {
              console.warn('Could not write initial profile to firestore:', err);
            }
            setUserProfile(newProfile);
            if (emailKey) {
              persistUserToLocalStorage(emailKey, newProfile);
            }
          }
        } catch (error) {
          console.error('Error fetching user profile from Firestore:', error);
        }
      } else {
        // Check if there is an active local student session
        const savedSession = localStorage.getItem(LOCAL_SESSION_KEY) || localStorage.getItem('ds_demo_session');
        if (savedSession) {
          loadLocalStudentData();
        } else {
          setCurrentUser(null);
          setUserProfile(null);
          setIsDemoMode(false);
          setCompletedTopics([]);
          setBookmarks([]);
          setNotes([]);
          setQuizScores([]);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync Real-Time Progress, Bookmarks, Notes, Quiz Scores from Firestore if authenticated with real Firebase
  useEffect(() => {
    if (!currentUser || isDemoMode) return;

    let unsubProgress = () => {};
    let unsubBookmarks = () => {};
    let unsubNotes = () => {};
    let unsubScores = () => {};

    try {
      // 1. Progress Doc
      const progressDocRef = doc(db, 'users', currentUser.uid, 'progress', 'data');
      unsubProgress = onSnapshot(
        progressDocRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setCompletedTopics(data.completedTopics || []);
          } else {
            setCompletedTopics([]);
          }
        },
        (err) => console.warn('Progress listener status:', err.message)
      );

      // 2. Bookmarks Collection
      const bookmarksColRef = collection(db, 'users', currentUser.uid, 'bookmarks');
      unsubBookmarks = onSnapshot(
        bookmarksColRef,
        (snapshot) => {
          const list: Bookmark[] = [];
          snapshot.forEach((d) => {
            list.push({ id: d.id, ...d.data() } as Bookmark);
          });
          setBookmarks(list);
        },
        (err) => console.warn('Bookmarks listener status:', err.message)
      );

      // 3. Notes Collection
      const notesColRef = collection(db, 'users', currentUser.uid, 'notes');
      const notesQuery = query(notesColRef, orderBy('updatedAt', 'desc'));
      unsubNotes = onSnapshot(
        notesQuery,
        (snapshot) => {
          const list: StudentNote[] = [];
          snapshot.forEach((d) => {
            list.push({ id: d.id, ...d.data() } as StudentNote);
          });
          setNotes(list);
        },
        (err) => console.warn('Notes listener status:', err.message)
      );

      // 4. Quiz Scores Collection
      const scoresColRef = collection(db, 'users', currentUser.uid, 'quizScores');
      const scoresQuery = query(scoresColRef, orderBy('completedAt', 'desc'));
      unsubScores = onSnapshot(
        scoresQuery,
        (snapshot) => {
          const list: QuizScore[] = [];
          snapshot.forEach((d) => {
            list.push({ id: d.id, ...d.data() } as QuizScore);
          });
          setQuizScores(list);
        },
        (err) => console.warn('Quiz scores listener status:', err.message)
      );
    } catch (err) {
      console.warn('Firestore sync initialization notice:', err);
    }

    return () => {
      unsubProgress();
      unsubBookmarks();
      unsubNotes();
      unsubScores();
    };
  }, [currentUser, isDemoMode]);

  // Auth Operations
  const signup = async (
    email: string,
    pass: string,
    fullName: string,
    university: string,
    degree: string,
    semester: string
  ) => {
    const emailKey = email.toLowerCase().trim();
    const cachedAvatar = localStorage.getItem('ds_avatar_' + emailKey);
    const initialAvatar = cachedAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName || email)}`;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;

      try {
        await updateFirebaseProfile(user, { displayName: fullName, photoURL: initialAvatar });
      } catch (e) {
        console.warn('Could not update display name on user:', e);
      }

      const newProfile: UserProfile = {
        uid: user.uid,
        email: user.email || email,
        fullName: fullName || 'Data Science Student',
        university: university || 'University',
        degree: degree || 'Data Science',
        semester: semester || 'Semester 1',
        avatarUrl: initialAvatar,
        theme: 'light',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, 'users', user.uid), newProfile);
      } catch (err) {
        console.warn('Could not write profile doc to Firestore:', err);
      }
      persistUserToLocalStorage(emailKey, newProfile, pass);
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(newProfile));
      setUserProfile(newProfile);
      setIsDemoMode(false);
    } catch (err: any) {
      // If Firebase Auth operation is not allowed, automatically create and save local account seamlessly
      if (err.code === 'auth/operation-not-allowed' || err.message?.includes('operation-not-allowed') || err.code?.includes('network')) {
        console.info('Using robust local student account storage for signup...');
        
        const localUid = 'student-' + Math.random().toString(36).substring(2, 9);
        const localProfile: UserProfile = {
          uid: localUid,
          email: email.trim(),
          fullName: fullName.trim() || 'Data Science Student',
          university: university.trim() || 'Data Science Institute',
          degree: degree.trim() || 'B.S. Data Science',
          semester: semester || 'Semester 3',
          avatarUrl: initialAvatar,
          theme: theme,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        persistUserToLocalStorage(emailKey, localProfile, pass);
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(localProfile));
        setUserProfile(localProfile);
        setCurrentUser({
          uid: localProfile.uid,
          email: localProfile.email,
          displayName: localProfile.fullName,
          isDemo: true
        });
        setIsDemoMode(true);
        loadLocalStudentData();
        return;
      }
      throw err;
    }
  };

  const login = async (email: string, pass: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    const cachedAvatar =
      localStorage.getItem('ds_avatar_' + normalizedEmail) ||
      localStorage.getItem('ds_avatar_last_saved');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      setIsDemoMode(false);
      
      if (userCredential.user) {
        const userDocRef = doc(db, 'users', userCredential.user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const profile = docSnap.data() as UserProfile;
          if (cachedAvatar && (!profile.avatarUrl || profile.avatarUrl.includes('dicebear'))) {
            profile.avatarUrl = cachedAvatar;
            try {
              await updateDoc(userDocRef, { avatarUrl: cachedAvatar });
            } catch (e) {
              console.warn('Sync avatar to Firestore error:', e);
            }
          }
          persistUserToLocalStorage(normalizedEmail, profile, pass);
          localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(profile));
          setUserProfile(profile);
        }
      }
    } catch (err: any) {
      // Check if user was registered locally or if fallback is needed
      let userProfileToUse: UserProfile | null = null;
      let matchedLocalUser = false;

      try {
        const raw = localStorage.getItem(LOCAL_USERS_KEY);
        if (raw) {
          const usersMap: Record<string, LocalUserRecord> = JSON.parse(raw);
          const userRecord = usersMap[normalizedEmail];
          if (userRecord) {
            if (userRecord.password && userRecord.password !== pass) {
              throw new Error('Incorrect password for this student account.');
            }
            userProfileToUse = userRecord.profile;
            matchedLocalUser = true;
          }
        }
      } catch (e: any) {
        if (e.message?.includes('Incorrect password')) throw e;
      }

      if (matchedLocalUser && userProfileToUse) {
        if (cachedAvatar && (!userProfileToUse.avatarUrl || userProfileToUse.avatarUrl.includes('dicebear'))) {
          userProfileToUse.avatarUrl = cachedAvatar;
        }
        persistUserToLocalStorage(normalizedEmail, userProfileToUse, pass);
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(userProfileToUse));
        setUserProfile(userProfileToUse);
        setCurrentUser({
          uid: userProfileToUse.uid,
          email: userProfileToUse.email,
          displayName: userProfileToUse.fullName,
          isDemo: true
        });
        setIsDemoMode(true);
        loadLocalStudentData();
        return;
      }

      // If Firebase Auth operation is not allowed or network issue, provision local account on the fly
      if (err.code === 'auth/operation-not-allowed' || err.message?.includes('operation-not-allowed') || err.code?.includes('network')) {
        console.info('Signing in with local student account...');
        const localUid = 'student-' + Math.random().toString(36).substring(2, 9);
        const nameFromEmail = email.split('@')[0].replace(/[._-]/g, ' ');
        const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

        userProfileToUse = {
          uid: localUid,
          email: email.trim(),
          fullName: formattedName || 'Data Science Student',
          university: 'Data Science Institute',
          degree: 'B.S. Data Science & AI',
          semester: 'Semester 3',
          avatarUrl: cachedAvatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(formattedName || email)}`,
          theme: theme,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        persistUserToLocalStorage(normalizedEmail, userProfileToUse, pass);
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(userProfileToUse));
        setUserProfile(userProfileToUse);
        setCurrentUser({
          uid: userProfileToUse.uid,
          email: userProfileToUse.email,
          displayName: userProfileToUse.fullName,
          isDemo: true
        });
        setIsDemoMode(true);
        loadLocalStudentData();
        return;
      }
      throw err;
    }
  };

  const loginAsDemo = async (customProfile?: Partial<UserProfile>) => {
    const demoEmail = customProfile?.email || 'student@university.edu';
    const normalizedEmail = demoEmail.toLowerCase().trim();
    const cachedAvatar =
      localStorage.getItem('ds_avatar_demo') ||
      localStorage.getItem('ds_avatar_' + normalizedEmail) ||
      localStorage.getItem('ds_avatar_last_saved');

    let existingProfile: UserProfile | null = null;
    try {
      const raw = localStorage.getItem(LOCAL_USERS_KEY);
      if (raw) {
        const usersMap: Record<string, LocalUserRecord> = JSON.parse(raw);
        if (usersMap[normalizedEmail]) {
          existingProfile = usersMap[normalizedEmail].profile;
        }
      }
      if (!existingProfile) {
        const rawDemo = localStorage.getItem('ds_demo_profile');
        if (rawDemo) existingProfile = JSON.parse(rawDemo);
      }
    } catch (e) {
      console.warn('Error fetching demo profile cache:', e);
    }

    const demoId = existingProfile?.uid || ('student-' + Math.random().toString(36).substring(2, 9));
    const resolvedAvatar =
      customProfile?.avatarUrl ||
      existingProfile?.avatarUrl ||
      cachedAvatar ||
      `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(customProfile?.fullName || existingProfile?.fullName || 'Alex Rivera')}`;

    const profile: UserProfile = {
      uid: demoId,
      email: demoEmail,
      fullName: customProfile?.fullName || existingProfile?.fullName || 'Alex Rivera',
      university: customProfile?.university || existingProfile?.university || 'Data Science Institute',
      degree: customProfile?.degree || existingProfile?.degree || 'B.S. Data Science & AI',
      semester: customProfile?.semester || existingProfile?.semester || 'Semester 3',
      avatarUrl: resolvedAvatar,
      theme: theme,
      createdAt: existingProfile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    persistUserToLocalStorage(profile.email, profile);
    localStorage.setItem('ds_demo_profile', JSON.stringify(profile));
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(profile));
    setUserProfile(profile);
    setCurrentUser({
      uid: profile.uid,
      email: profile.email,
      displayName: profile.fullName,
      isDemo: true
    });
    setIsDemoMode(true);
    loadLocalStudentData();
  };

  const logout = async () => {
    // Clear only active session tokens so the user is logged out,
    // but KEEP registered accounts & avatars safely saved in LOCAL_USERS_KEY & ds_avatar_*!
    localStorage.removeItem(LOCAL_SESSION_KEY);
    localStorage.removeItem('ds_demo_session');
    
    if (!isDemoMode) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn('Signout warning:', e);
      }
    }
    setCurrentUser(null);
    setUserProfile(null);
    setIsDemoMode(false);
    setCompletedTopics([]);
    setBookmarks([]);
    setNotes([]);
    setQuizScores([]);
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed' || err.message?.includes('operation-not-allowed')) {
        console.info('Simulated password reset email sent for local student user.');
        return;
      }
      throw err;
    }
  };

  const updateStudentProfile = async (updates: Partial<UserProfile>) => {
    if (!currentUser) throw new Error('Not authenticated');
    
    const targetEmail = (updates.email || userProfile?.email || currentUser.email || '').toLowerCase().trim();
    const targetUid = userProfile?.uid || currentUser.uid;
    const resolvedAvatar = updates.avatarUrl !== undefined ? updates.avatarUrl : (userProfile?.avatarUrl || '');

    const updatedProfile: UserProfile = {
      uid: targetUid,
      email: targetEmail,
      fullName: updates.fullName || userProfile?.fullName || currentUser.displayName || 'Data Science Student',
      university: updates.university || userProfile?.university || 'University',
      degree: updates.degree || userProfile?.degree || 'Data Science',
      semester: updates.semester || userProfile?.semester || 'Semester 1',
      avatarUrl: resolvedAvatar,
      theme: updates.theme || userProfile?.theme || theme,
      createdAt: userProfile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 1. Update React state immediately
    setUserProfile(updatedProfile);

    // 2. Persist to active session
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(updatedProfile));

    // 3. Persist to registered accounts store & dedicated avatar key
    if (resolvedAvatar) {
      localStorage.setItem('ds_avatar_last_saved', resolvedAvatar);
      if (targetEmail) {
        localStorage.setItem('ds_avatar_' + targetEmail, resolvedAvatar);
      }
      if (targetUid) {
        localStorage.setItem('ds_avatar_' + targetUid, resolvedAvatar);
      }
      if (isDemoMode) {
        localStorage.setItem('ds_avatar_demo', resolvedAvatar);
      }
    }

    if (targetEmail) {
      persistUserToLocalStorage(targetEmail, updatedProfile);
    }
    if (isDemoMode) {
      localStorage.setItem('ds_demo_profile', JSON.stringify(updatedProfile));
    }

    // 4. If connected to real Firebase, sync to Firestore and Firebase Auth
    if (!isDemoMode && auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', targetUid);
        await setDoc(userDocRef, updatedProfile, { merge: true });
      } catch (e) {
        console.warn('Could not update Firestore profile doc:', e);
      }

      try {
        await updateFirebaseProfile(auth.currentUser, {
          displayName: updatedProfile.fullName,
          photoURL: updatedProfile.avatarUrl
        });
      } catch (e) {
        console.warn('Could not update Firebase Auth user profile:', e);
      }
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (currentUser && !isDemoMode) {
      try {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          theme: newTheme,
          updatedAt: new Date().toISOString()
        });
      } catch (err) {
        console.warn('Error saving theme to Firestore:', err);
      }
    }
  };

  const toggleTopicCompletion = async (topicId: string, subjectId: SubjectId) => {
    if (!currentUser) return;
    const isCompleted = completedTopics.includes(topicId);
    const updatedTopics = isCompleted
      ? completedTopics.filter((id) => id !== topicId)
      : [...completedTopics, topicId];

    setCompletedTopics(updatedTopics);

    if (isDemoMode) {
      localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(updatedTopics));
      return;
    }

    try {
      const progressDocRef = doc(db, 'users', currentUser.uid, 'progress', 'data');
      await setDoc(
        progressDocRef,
        {
          completedTopics: updatedTopics,
          lastStudiedTopicId: topicId,
          lastStudiedSubjectId: subjectId,
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      );
    } catch (e) {
      console.warn('Error saving progress to Firestore:', e);
      localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(updatedTopics));
    }
  };

  const toggleBookmark = async (topic: Topic) => {
    if (!currentUser) return;
    const exists = bookmarks.some((b) => b.topicId === topic.id);
    let updated: Bookmark[];

    if (exists) {
      updated = bookmarks.filter((b) => b.topicId !== topic.id);
    } else {
      const newBookmark: Bookmark = {
        id: topic.id,
        topicId: topic.id,
        subjectId: topic.subjectId,
        topicTitle: topic.title,
        subjectTitle: topic.subjectId.toUpperCase(),
        createdAt: new Date().toISOString()
      };
      updated = [...bookmarks, newBookmark];
    }

    setBookmarks(updated);

    if (isDemoMode) {
      localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(updated));
      return;
    }

    try {
      const bookmarkDocRef = doc(db, 'users', currentUser.uid, 'bookmarks', topic.id);
      if (exists) {
        await deleteDoc(bookmarkDocRef);
      } else {
        const newBookmark: Bookmark = {
          id: topic.id,
          topicId: topic.id,
          subjectId: topic.subjectId,
          topicTitle: topic.title,
          subjectTitle: topic.subjectId.toUpperCase(),
          createdAt: new Date().toISOString()
        };
        await setDoc(bookmarkDocRef, newBookmark);
      }
    } catch (e) {
      console.warn('Error updating bookmark in Firestore:', e);
      localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(updated));
    }
  };

  const isBookmarked = (topicId: string) => {
    return bookmarks.some((b) => b.topicId === topicId);
  };

  const isTopicCompleted = (topicId: string) => {
    return completedTopics.includes(topicId);
  };

  const addNote = async (
    title: string,
    content: string,
    subjectId: SubjectId | 'general',
    topicId?: string,
    topicTitle?: string
  ): Promise<string> => {
    if (!currentUser) throw new Error('Not authenticated');
    const newId = 'note-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    const notePayload: StudentNote = {
      id: newId,
      title,
      content,
      subjectId,
      topicId: topicId || '',
      topicTitle: topicTitle || '',
      createdAt: now,
      updatedAt: now
    };

    const nextNotes = [notePayload, ...notes];
    setNotes(nextNotes);

    if (isDemoMode) {
      localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(nextNotes));
      return newId;
    }

    try {
      const notesColRef = collection(db, 'users', currentUser.uid, 'notes');
      const newDocRef = doc(notesColRef, newId);
      await setDoc(newDocRef, notePayload);
    } catch (e) {
      console.warn('Error writing note to Firestore:', e);
      localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(nextNotes));
    }
    return newId;
  };

  const updateNote = async (
    id: string,
    updates: { title?: string; content?: string; subjectId?: SubjectId | 'general' }
  ) => {
    if (!currentUser) throw new Error('Not authenticated');
    const nextNotes = notes.map((n) =>
      n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
    );
    setNotes(nextNotes);

    if (isDemoMode) {
      localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(nextNotes));
      return;
    }

    try {
      const noteDocRef = doc(db, 'users', currentUser.uid, 'notes', id);
      await updateDoc(noteDocRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Error updating note in Firestore:', e);
      localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(nextNotes));
    }
  };

  const deleteNote = async (id: string) => {
    if (!currentUser) throw new Error('Not authenticated');
    const nextNotes = notes.filter((n) => n.id !== id);
    setNotes(nextNotes);

    if (isDemoMode) {
      localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(nextNotes));
      return;
    }

    try {
      const noteDocRef = doc(db, 'users', currentUser.uid, 'notes', id);
      await deleteDoc(noteDocRef);
    } catch (e) {
      console.warn('Error deleting note in Firestore:', e);
      localStorage.setItem(LOCAL_NOTES_KEY, JSON.stringify(nextNotes));
    }
  };

  const saveQuizScore = async (
    subjectId: SubjectId,
    subjectTitle: string,
    score: number,
    totalQuestions: number
  ) => {
    if (!currentUser) return;
    const scoreId = 'score-' + Date.now();
    const percentage = Math.round((score / totalQuestions) * 100);

    const scoreData: QuizScore = {
      id: scoreId,
      subjectId,
      subjectTitle,
      score,
      totalQuestions,
      percentage,
      completedAt: new Date().toISOString()
    };

    const nextScores = [scoreData, ...quizScores];
    setQuizScores(nextScores);

    if (isDemoMode) {
      localStorage.setItem(LOCAL_SCORES_KEY, JSON.stringify(nextScores));
      return;
    }

    try {
      const scoresColRef = collection(db, 'users', currentUser.uid, 'quizScores');
      const newScoreRef = doc(scoresColRef, scoreId);
      await setDoc(newScoreRef, scoreData);
    } catch (e) {
      console.warn('Error saving quiz score to Firestore:', e);
      localStorage.setItem(LOCAL_SCORES_KEY, JSON.stringify(nextScores));
    }
  };

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    isDemoMode,
    completedTopics,
    bookmarks,
    notes,
    quizScores,
    theme,
    signup,
    login,
    loginAsDemo,
    logout,
    resetPassword,
    updateStudentProfile,
    toggleTheme,
    toggleTopicCompletion,
    toggleBookmark,
    isBookmarked,
    isTopicCompleted,
    addNote,
    updateNote,
    deleteNote,
    saveQuizScore
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
