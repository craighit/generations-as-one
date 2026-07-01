import { create } from 'zustand';
import type { FamilyMember, Expert, ChatMessage } from '@/types';
import { mockFamilyMembers, mockExperts } from '@/data/mockData';

// 家庭成员状态
interface FamilyState {
  members: FamilyMember[];
  selectedMember: FamilyMember | null;
  addMember: (member: FamilyMember) => void;
  selectMember: (member: FamilyMember | null) => void;
  updateMember: (id: string, updates: Partial<FamilyMember>) => void;
}

export const useFamilyStore = create<FamilyState>((set) => ({
  members: mockFamilyMembers,
  selectedMember: null,
  addMember: (member) => set((state) => ({ members: [...state.members, member] })),
  selectMember: (member) => set({ selectedMember: member }),
  updateMember: (id, updates) =>
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),
}));

// 专家状态
interface ExpertState {
  experts: Expert[];
  selectedExpert: Expert | null;
  selectExpert: (expert: Expert | null) => void;
}

export const useExpertStore = create<ExpertState>((set) => ({
  experts: mockExperts,
  selectedExpert: null,
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