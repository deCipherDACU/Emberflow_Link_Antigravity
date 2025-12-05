
import {
  BookOpen,
  Briefcase,
  HeartPulse,
  Brain,
  Coins,
  Heart,
  Gamepad2,
  Home,
  Coffee,
  User as UserIcon,
  LucideIcon,
  Sparkles,
  Dumbbell,
  Users,
  DollarSign,
} from 'lucide-react';
import { LIFE_CATEGORIES } from './lifeBalanceCategories';

const categoryIcons: { [key: string]: LucideIcon } = {
  Education: BookOpen,
  Career: Briefcase,
  Health: HeartPulse,
  'Mental Wellness': Brain,
  Finance: Coins,
  Social: Heart,
  Hobbies: Gamepad2,
  Home: Home,
  Break: Coffee,
  Commitment: UserIcon,
  personal: Sparkles,
  intellectual: Brain,
  social: Users,
  financial: DollarSign,
  spiritual: Heart,
  physical: Dumbbell,
};

export function getCategoryIcon(category: string): LucideIcon {
  return categoryIcons[category] || Sparkles;
}

export function getLifeCategoryIcon(categoryId: string): LucideIcon {
    const category = LIFE_CATEGORIES[categoryId];
    return category ? category.icon : Sparkles;
}
