import { ROLES } from '@/enums/roles.enum'
import {
  IconBell,
  IconBookOpen,
  IconBriefcase,
  IconCircleUser,
  IconClipboard,
  IconClipboardPen,
  IconDashboard,
  IconFileCheck,
  IconFolder,
  IconGraduationCap,
  IconLogOut,
  IconMessage,
  IconScanFace,
  IconSettings,
  IconUsers,
} from '@/icons'

export const MENU_GROUP = [
  {
    groupName: 'Menu',
    groupItems: [
      {
        name: 'Dashboard',
        link: '/dashboard',
        icon: IconDashboard,
        hidden: [],
      },
      {
        name: 'Teachers',
        link: '/teachers',
        icon: IconBriefcase,
        hidden: [],
      },
      {
        name: 'Students',
        link: '/students',
        icon: IconGraduationCap,
        hidden: [ROLES.PARENT],
      },
      {
        name: 'Parents',
        link: '/parents',
        icon: IconUsers,
        hidden: [ROLES.STUDENT, ROLES.PARENT],
      },
      {
        name: 'Subjects',
        link: '/subjects',
        icon: IconBookOpen,
        hidden: [ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT],
      },
      {
        name: 'Classes',
        link: '/classes',
        icon: IconDashboard,
        hidden: [ROLES.STUDENT, ROLES.PARENT],
      },
      {
        name: 'Lessons',
        link: '/lessons',
        icon: IconFolder,
        hidden: [ROLES.PARENT],
      },
      {
        name: 'Exams',
        link: '/exams',
        icon: IconClipboard,
        hidden: [ROLES.PARENT],
      },
      {
        name: 'Assignments',
        link: '/assignments',
        icon: IconClipboardPen,
        hidden: [],
      },
      {
        name: 'Results',
        link: '/results',
        icon: IconFileCheck,
        hidden: [],
      },
      {
        name: 'Attendance',
        link: '/attendance',
        icon: IconScanFace,
        hidden: [],
      },
      {
        name: 'Messages',
        link: '/messages',
        icon: IconMessage,
        hidden: [],
      },
      {
        name: 'Announcements',
        link: '/announcements',
        icon: IconBell,
        hidden: [],
      },
    ],
  },
  {
    groupName: 'Other',
    groupItems: [
      {
        name: 'Profile',
        link: '/profile',
        icon: IconCircleUser,
      },
      {
        name: 'Settings',
        link: '/settings',
        icon: IconSettings,
      },
      {
        name: 'Logout',
        link: '/logout',
        icon: IconLogOut,
      },
    ],
  },
]
