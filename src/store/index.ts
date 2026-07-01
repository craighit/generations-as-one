import { create } from 'zustand';
import type { FamilyMember, Expert, ChatMessage, User } from '@shared/types';
import { familyService } from '@/services/familyService';
import { expertService } from '@/services/expertService';
import { mockFamilyMembers, mockExperts } from '@/data/mockData';

// 家庭成员状态
interface FamilyState {
  members: FamilyMember[];
  selectedMember: FamilyMember | null;
  loading: boolean;
  error: string | null;
  fetchMembers: () => Promise<void>;
  selectMember: (member: FamilyMember | null) => void;
  addMember: (member: FamilyMember) => void;
  updateMember: (id: string, updates: Partial<FamilyMember>) => void;
}

export const useFamilyStore = create<FamilyState>((set) => ({
  members: mockFamilyMembers,
  selectedMember: null,
  loading: false,
  error: null,

  fetchMembers: async () => {
    set({ loading: true, error: null });
    try {
      const members = await familyService.getMembers();
      set({ members, loading: false });
    } catch {
      set({ error: '加载家庭成员失败', loading: false });
    }
  },

  selectMember: (member) => set({ selectedMember: member }),

  addMember: (member) =>
    set((state) => ({ members: [...state.members, member] })),

  updateMember: (id, updates) =>
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),
}));

// 专家状态
interface ExpertState {
  experts: Expert[];
  selectedExpert: Expert | null;
  loading: boolean;
  fetchExperts: () => Promise<void>;
  selectExpert: (expert: Expert | null) => void;
}

export const useExpertStore = create<ExpertState>((set) => ({
  experts: mockExperts,
  selectedExpert: null,
  loading: false,

  fetchExperts: async () => {
    set({ loading: true });
    try {
      const experts = await expertService.getExperts();
      set({ experts, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  selectExpert: (expert) => set({ selectedExpert: expert }),
}));

// 对话状态
interface ChatState {
  messages: ChatMessage[];
  currentChatId: string | null;
  addMessage: (message: ChatMessage) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentChatId: null,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearChat: () => set({ messages: [], currentChatId: null }),
}));

// 用户状态
interface UserState {
  currentUser: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isLoggedIn: false,
  login: (user) => set({ currentUser: user, isLoggedIn: true }),
  logout: () => set({ currentUser: null, isLoggedIn: false }),
}));

// UI状态
interface UIState {
  activeTab: string;
  sidebarOpen: boolean;
  modalOpen: string | null;
  setActiveTab: (tab: string) => void;
  toggleSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: '/',
  sidebarOpen: true,
  modalOpen: null,
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (modalId) => set({ modalOpen: modalId }),
  closeModal: () => set({ modalOpen: null }),
}));