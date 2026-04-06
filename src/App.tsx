/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Info, 
  Key, 
  Mail, 
  Building2, 
  Users2, 
  BookOpen, 
  FileText, 
  Library, 
  ClipboardList, 
  LogOut, 
  ChevronDown, 
  Search, 
  Bell, 
  Settings, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Files,
  Image as ImageIcon,
  Clock,
  CheckCircle2,
  XCircle,
  BarChart,
  LineChart,
  PieChart,
  Activity,
  User,
  Lock,
  EyeOff,
  Github,
  Chrome,
  Globe,
  Phone,
  MapPin,
  Sun,
  Moon
} from 'lucide-react';
import { 
  LineChart as ReLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart as ReBarChart,
  Bar,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { View, User as UserType, Department, Group, Course, Role, APIKey } from './types';

// Utility for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---

const MOCK_USERS: UserType[] = [
  { id: '1', name: 'Shehu Isah', email: 'shehulsah@gmail.com', roles: 'Users', departments: 'ARPAI Isak', status: 'ACTIVE' },
  { id: '2', name: 'Leela Cheturi', email: 'leelacheri@gmail.com', roles: 'Registrations', departments: 'DEPARTMENTS', status: 'ACTIVE' },
  { id: '3', name: 'Yauheni Bakhanau', email: 'yauhenibakhanau.com', roles: 'Roles & Bakhanau', departments: 'DEPARTMENTS', status: 'ACTIVE' },
  { id: '4', name: 'Sehmu Isvath', email: 'eshuziehi@gmail.com', roles: 'Roles & Assignsints', departments: 'DEPARTMENTS', status: 'ACTIVE' },
  { id: '5', name: 'Miktry Hyssh', email: 'miktayam@gmail.com', roles: 'Roles & Pavismans', departments: 'DEPARTMENTS', status: 'ACTIVE' },
  { id: '6', name: 'Leela Cheturi', email: 'leelachetoi@gmail.com', roles: 'Roles', departments: 'DEPARTMENTS', status: 'ACTIVE' },
  { id: '7', name: 'dakraci kalmthana', email: 'aalcitonts@gmail.com', roles: 'Roles', departments: 'DEPARTMENTS', status: 'ACTIVE' },
  { id: '8', name: 'Yauheni Bakhanau', email: 'yahenli@gmail.com', roles: 'Roles & Perms', departments: 'DEPARTMENTS', status: 'ACTIVE' },
];

const MOCK_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Physics', description: 'No description', head: 'Unassigned', members: 1, status: 'Active' },
  { id: '2', name: 'Mathematics', description: 'Department of Mathematics', head: 'Unassigned', members: 0, status: 'Active' },
  { id: '3', name: 'Computer Science', description: 'Department of Computer Science and Engineering', head: 'Unassigned', members: 4, status: 'Active' },
  { id: '4', name: 'A-Test', description: 'Test department 1', head: 'Unassigned', members: 1, status: 'Active' },
  { id: '5', name: 'Test department 1', description: 'dfgdfg', head: 'Unassigned', members: 0, status: 'Inactive' },
  { id: '6', name: 'Erkan', description: 'sdfsdfdfd', head: 'Unassigned', members: 4, status: 'Inactive' },
];

const MOCK_GROUPS: Group[] = [
  { id: '1', name: 'CS101 Lab B', department: 'Computer Science', description: 'No description', members: 2, type: 'STUDENT', status: 'Active' },
  { id: '2', name: 'A-GroupTest1', department: 'A-Test', description: 'No description', members: 4, type: 'STUDENT', status: 'Active' },
  { id: '3', name: 'Test Group 5', department: 'TesT', description: 'No description', members: 1, type: 'MIXED', status: 'Inactive' },
  { id: '4', name: 'Test Group 4', department: 'TesT', description: 'No description', members: 2, type: 'STUDENT', status: 'Active' },
  { id: '5', name: 'Test Group 4', department: 'TesT', description: 'No description', members: 2, type: 'MIXED', status: 'Active' },
  { id: '6', name: 'Test Group 3', department: 'TesT', description: 'No description', members: 2, type: 'MIXED', status: 'Inactive' },
];

const MOCK_COURSES: Course[] = [
  { id: '1', name: 'CS101', department: 'Computer Science', groups: 'CS101 Lab B' },
  { id: '2', name: 'PII - TestT', department: 'TesT', groups: 'Test Group 4' },
  { id: '3', name: 'A-CourseTest_Space', department: 'A-Test', groups: 'A-GroupTest1' },
  { id: '4', name: 'A-CourseTest2', department: 'A-Test', groups: 'A-GroupTest1' },
  { id: '5', name: 'A-CourseTest1', department: 'A-Test', groups: 'A-GroupTest1' },
  { id: '6', name: 'General Course - TesT', department: 'TesT', groups: 'Test Group 4' },
  { id: '7', name: 'MATH-101', department: 'Mathematics', groups: 'Test Group 1' },
];

const MOCK_ROLES: Role[] = [
  { id: '1', name: 'OKAY', description: 'Okay into this role.', users: 0, color: 'purple' },
  { id: '2', name: 'STUDENT', description: 'Student on description.', users: 8, color: 'green' },
  { id: '3', name: 'RESEARCHER', description: 'Researcher on online role.', users: 11, color: 'blue' },
  { id: '4', name: 'SUPERADMIN', description: 'Superadmin on alone, mi...', users: 2, color: 'red' },
  { id: '5', name: 'STAFF', description: 'Staff for remote staff.', users: 17, color: 'teal' },
];

const MOCK_API_KEYS: APIKey[] = [
  { id: '1', name: 'Test API key 01', prefix: 'uok_79b590bc9502...', created: '02/04/2026, 18:39:07', expires: 'Never', lastUsed: '—', permissions: ['assistant:assign', 'assistant:create', 'assistant:delete', 'assistant:read', 'assistant:revoke', 'assistant:share', 'assistant:update'] },
  { id: '2', name: 'Test API key 02', prefix: 'uok_7378f210d10a...', created: '02/04/2026, 18:39:52', expires: '30/04/2026, 18:39:00', lastUsed: '—', permissions: ['assistant:assign', 'assistant:create', 'assistant:read', 'assistant:revoke', 'assistant:share', 'assistant:update'] },
];

const INTERACTION_DATA = [
  { name: 'Mar 30', value: 2 },
  { name: '', value: 4 },
  { name: '', value: 3 },
  { name: '', value: 6 },
  { name: '', value: 5 },
  { name: '', value: 16 },
  { name: 'Mar 30', value: 4 },
];

const TOKEN_USAGE_DATA = [
  { name: 'Mar 18', value: 0 },
  { name: '', value: 200000 },
  { name: '', value: 800000 },
  { name: '', value: 1600000 },
  { name: '', value: 400000 },
  { name: '', value: 200000 },
  { name: 'Mar 18', value: 0 },
];

const IMAGES_DATA = [
  { name: 'Mar 31', value: 0 },
  { name: '', value: 0.5 },
  { name: '', value: 1.2 },
  { name: '', value: 0.8 },
  { name: '', value: 3 },
  { name: '', value: 1.5 },
  { name: 'Mar 31', value: 0 },
];

// --- Components ---

const GlassCard = ({ children, className, title, subtitle, action }: { children: React.ReactNode, className?: string, title?: string, subtitle?: string, action?: React.ReactNode, key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn("glass-card p-6", className)}
  >
    {(title || action) && (
      <div className="flex justify-between items-center mb-6">
        <div>
          {title && <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>}
          {subtitle && <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{subtitle}</p>}
        </div>
        {action}
      </div>
    )}
    {children}
  </motion.div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick, subItems }: { icon: any, label: string, active?: boolean, onClick: () => void, subItems?: boolean }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group",
      active 
        ? "bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 neon-glow-blue border border-blue-100 dark:border-blue-500/30" 
        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
    )}
  >
    <Icon size={20} className={cn("transition-colors", active ? "text-blue-600 dark:text-blue-400" : "group-hover:text-slate-900 dark:group-hover:text-white")} />
    <span className="text-sm font-medium">{label}</span>
    {subItems && <ChevronDown size={14} className="ml-auto opacity-50" />}
  </button>
);

const SidebarCategory = ({ label }: { label: string }) => (
  <div className="px-4 mt-6 mb-2 text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-400 uppercase">
    {label}
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const isActive = status.toLowerCase() === 'active';
  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase",
      isActive ? "bg-neon-green/20 text-neon-green border border-neon-green/30" : "bg-neon-pink/20 text-neon-pink border border-neon-pink/30"
    )}>
      {status}
    </span>
  );
};

// --- Views ---

const DashboardView = ({ theme }: { theme: 'light' | 'dark' }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Analytics Dashboard</h1>
      <div className="flex gap-2">
        {['Last Day', 'Last Week', 'Last Month', 'Custom'].map((t) => (
          <button key={t} className="glass-button text-xs px-3 py-1.5">{t}</button>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {[
        { label: 'Total Interactions', value: '55', icon: BarChart3, color: 'blue' },
        { label: 'Tokens Processed', value: '2,864,681', icon: Activity, color: 'purple', sub: '24,422 in / 2,840,259 out' },
        { label: 'Files Processed', value: '0', icon: Files, color: 'orange' },
        { label: 'Images Processed', value: '4', icon: ImageIcon, color: 'pink' },
        { label: 'Total Duration', value: '12m 13s', icon: Clock, color: 'teal' },
      ].map((stat, i) => (
        <GlassCard key={i} className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg", `bg-neon-${stat.color}/10 text-neon-${stat.color}`)}>
              <stat.icon size={20} />
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</div>
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{stat.value}</div>
            {stat.sub && <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{stat.sub}</div>}
          </div>
        </GlassCard>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GlassCard title="Interactions Over Time" className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={INTERACTION_DATA}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.05} vertical={false} />
            <XAxis dataKey="name" stroke="currentColor" strokeOpacity={0.3} fontSize={10} axisLine={false} tickLine={false} />
            <YAxis stroke="currentColor" strokeOpacity={0.3} fontSize={10} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: theme === 'dark' ? 'rgba(10,10,26,0.9)' : 'rgba(255,255,255,0.9)', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard title="Token Usage" className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={TOKEN_USAGE_DATA}>
            <defs>
              <linearGradient id="colorToken" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.05} vertical={false} />
            <XAxis dataKey="name" stroke="currentColor" strokeOpacity={0.3} fontSize={10} axisLine={false} tickLine={false} />
            <YAxis stroke="currentColor" strokeOpacity={0.3} fontSize={10} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: theme === 'dark' ? 'rgba(10,10,26,0.9)' : 'rgba(255,255,255,0.9)', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              itemStyle={{ color: '#8b5cf6' }}
            />
            <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorToken)" dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard title="Files Over Time" className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={[{ name: 'Mar 18', value: 0 }, { name: 'Mar 30', value: 0 }]}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.05} vertical={false} />
            <XAxis dataKey="name" stroke="currentColor" strokeOpacity={0.3} fontSize={10} axisLine={false} tickLine={false} />
            <YAxis stroke="currentColor" strokeOpacity={0.3} fontSize={10} axisLine={false} tickLine={false} />
            <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard title="Images Over Time" className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={IMAGES_DATA}>
            <defs>
              <linearGradient id="colorImage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff0080" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ff0080" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.05} vertical={false} />
            <XAxis dataKey="name" stroke="currentColor" strokeOpacity={0.3} fontSize={10} axisLine={false} tickLine={false} />
            <YAxis stroke="currentColor" strokeOpacity={0.3} fontSize={10} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: theme === 'dark' ? 'rgba(10,10,26,0.9)' : 'rgba(255,255,255,0.9)', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              itemStyle={{ color: '#ff0080' }}
            />
            <Area type="monotone" dataKey="value" stroke="#ff0080" strokeWidth={3} fillOpacity={1} fill="url(#colorImage)" dot={{ r: 4, fill: '#ff0080', strokeWidth: 2, stroke: '#fff' }} />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  </div>
);

const UsersView = () => (
  <GlassCard title="Users" subtitle="Manage system users and roles.">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-slate-400 dark:text-slate-500 text-[10px] font-bold tracking-widest uppercase border-b border-slate-100 dark:border-white/5">
            <th className="pb-4 px-4">Name</th>
            <th className="pb-4 px-4">Email</th>
            <th className="pb-4 px-4">Roles</th>
            <th className="pb-4 px-4">Departments</th>
            <th className="pb-4 px-4">Status</th>
            <th className="pb-4 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {MOCK_USERS.map((user) => (
            <tr key={user.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-50 dark:border-white/5 last:border-0">
              <td className="py-4 px-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-medium text-slate-900 dark:text-white">{user.name}</span>
              </td>
              <td className="py-4 px-4 text-slate-500 dark:text-slate-400">{user.email}</td>
              <td className="py-4 px-4 text-slate-500 dark:text-slate-400">{user.roles}</td>
              <td className="py-4 px-4 text-slate-500 dark:text-slate-400">{user.departments}</td>
              <td className="py-4 px-4">
                <StatusBadge status={user.status} />
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"><BarChart3 size={16} /></button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"><Edit2 size={16} /></button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-6 flex justify-between items-center text-xs text-slate-400 dark:text-slate-500">
      <div className="flex gap-2">
        <button className="glass-button p-1.5 opacity-50 cursor-not-allowed"><ArrowLeft size={14} /></button>
        <button className="glass-button px-3 py-1.5 bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/30">1</button>
        <span className="flex items-center px-2">of 3</span>
        <button className="glass-button p-1.5"><ArrowLeft size={14} className="rotate-180" /></button>
      </div>
    </div>
  </GlassCard>
);

const DepartmentsView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Departments</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage organization departments and structures.</p>
      </div>
      <button className="glass-button bg-blue-600 text-white border-blue-600 hover:bg-blue-700 flex items-center gap-2">
        <Plus size={18} /> Create Department
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_DEPARTMENTS.map((dept) => (
        <GlassCard key={dept.id} className="relative group overflow-hidden hover:border-blue-200 dark:hover:border-blue-500/50 transition-all">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{dept.name}</h3>
            <StatusBadge status={dept.status} />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 h-10">{dept.description}</p>
          
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <User size={14} className="text-slate-400 dark:text-slate-500" /> <span>Head: {dept.head}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users2 size={14} className="text-slate-400 dark:text-slate-500" /> <span>{dept.members} Members</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex justify-end gap-2">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"><Eye size={18} /></button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"><Edit2 size={18} /></button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-red-500"><Trash2 size={18} /></button>
          </div>
        </GlassCard>
      ))}
    </div>
  </div>
);

const GroupsView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Groups</h1>
      <button className="glass-button bg-blue-600 text-white border-blue-600 hover:bg-blue-700 flex items-center gap-2">
        <Plus size={18} /> Create Group
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_GROUPS.map((group) => (
        <GlassCard key={group.id} className="relative group hover:border-blue-200 dark:hover:border-blue-500/50 transition-all">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{group.name}</h3>
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold",
                group.type === 'STUDENT' ? "bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400" : "bg-purple-50 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400"
              )}>
                {group.type}
              </span>
            </div>
            <StatusBadge status={group.status} />
          </div>
          <div className="text-sm text-slate-400 dark:text-slate-500 mb-1">{group.department}</div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{group.description}</p>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-300 font-medium">{group.members} Members</span>
            <div className="flex gap-1">
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"><BarChart3 size={16} /></button>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"><Edit2 size={16} /></button>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-red-500"><Trash2 size={16} /></button>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  </div>
);

const RolesView = () => (
  <div className="space-y-8">
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Roles & Permissions</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage roles and permissions for your organization.</p>
        </div>
        <button className="glass-button bg-blue-600 text-white border-blue-600 hover:bg-blue-700 flex items-center gap-2">
          <ShieldCheck size={18} /> Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {MOCK_ROLES.map((role) => (
          <GlassCard key={role.id} className={cn("p-4 border-l-4", `border-l-neon-${role.color}`)}>
            <div className="flex items-center gap-2 mb-4">
              <div className={cn("p-1.5 rounded-lg", `bg-neon-${role.color}/10 text-neon-${role.color}`)}>
                {role.name === 'STUDENT' ? <BookOpen size={16} /> : role.name === 'RESEARCHER' ? <Building2 size={16} /> : <User size={16} />}
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{role.name}</h3>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4 h-8">{role.description}</p>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-slate-400 dark:text-slate-500 font-bold">{role.users} users</span>
              <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">Permissions <ChevronDown size={10} /></button>
            </div>
            <button className="w-full mt-4 py-1.5 text-[10px] font-bold border border-slate-100 dark:border-white/5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-600 dark:text-slate-300">View</button>
          </GlassCard>
        ))}
      </div>
    </div>

    <GlassCard title="All Permissions">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 dark:text-slate-500 text-[10px] font-bold tracking-widest uppercase border-b border-slate-100 dark:border-white/5">
              <th className="pb-4 px-4">Permission</th>
              <th className="pb-4 px-4">Description</th>
              <th className="pb-4 px-4">Included in Roles</th>
              <th className="pb-4 px-4">Roles</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {[
              { id: '1', name: 'assignment_alarm:manage', desc: 'Assist in an assignment manage', included: ['STUDENT', 'RESEARCHER', 'STAFF'], roles: ['STAFF', 'SUPERADMIN', 'OKAY'] },
              { id: '2', name: 'assistant:assign', desc: 'Assistant assign to assistant', included: ['STUDENT', 'RESEARCHER', 'STAFF', 'SUPERADMIN'], roles: ['STAFF', 'SUPERADMIN', 'OKAY'] },
              { id: '3', name: 'assistant:create', desc: 'Create assistant in active holder', included: ['STUDENT', 'RESEARCHER', 'STAFF'], roles: ['STAFF', 'SUPERADMIN', 'OKAY'] },
            ].map((perm) => (
              <tr key={perm.id} className="border-b border-slate-50 dark:border-white/5 last:border-0">
                <td className="py-4 px-4 font-mono text-blue-600 dark:text-blue-400 font-bold">{perm.name}</td>
                <td className="py-4 px-4 text-slate-500 dark:text-slate-400">{perm.desc}</td>
                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-1">
                    {perm.included.map(r => (
                      <span key={r} className="px-1.5 py-0.5 rounded bg-green-50 dark:bg-green-600/20 text-green-600 dark:text-green-400 text-[8px] font-bold">{r}</span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-1">
                    {perm.roles.map(r => (
                      <span key={r} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-[8px] font-bold">{r}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  </div>
);

const APIKeysView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">API Keys</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your organization's API keys.</p>
      </div>
      <button className="glass-button bg-blue-600 text-white border-blue-600 hover:bg-blue-700 flex items-center gap-2">
        <Plus size={18} /> Create New Key
      </button>
    </div>

    <GlassCard className="p-0 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-slate-400 dark:text-slate-500 text-[10px] font-bold tracking-widest uppercase border-b border-slate-100 dark:border-white/5">
            <th className="py-4 px-6">Name</th>
            <th className="py-4 px-6">Prefix</th>
            <th className="py-4 px-6">Created</th>
            <th className="py-4 px-6">Expires</th>
            <th className="py-4 px-6">Last Used</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {MOCK_API_KEYS.map((key) => (
            <tr key={key.id} className="border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">{key.name}</td>
              <td className="py-4 px-6 font-mono text-slate-500 dark:text-slate-400">{key.prefix}</td>
              <td className="py-4 px-6 text-slate-400 dark:text-slate-500">{key.created}</td>
              <td className="py-4 px-6 text-slate-400 dark:text-slate-500">{key.expires}</td>
              <td className="py-4 px-6 text-slate-400 dark:text-slate-500">{key.lastUsed}</td>
              <td className="py-4 px-6 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"><Eye size={16} /></button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"><Edit2 size={16} /></button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  </div>
);

const DetailsView = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">University of Kent</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Default organization</p>
      </div>
      <button className="glass-button flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
        <Edit2 size={18} /> Edit Organization
      </button>
    </div>

    <div className="flex gap-4 border-b border-slate-100 dark:border-white/5">
      {['Departments', 'Groups', 'Users'].map((tab) => (
        <button key={tab} className={cn(
          "px-8 py-3 text-sm font-medium transition-all border-b-2",
          tab === 'Departments' ? "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-600/10" : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
        )}>
          {tab}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GlassCard title="Contact Information">
        <div className="space-y-6 mt-4">
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
            <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500"><Globe size={20} /></div>
            <div>
              <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Website</div>
              <div className="text-sm text-slate-900 dark:text-white">Not provided</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
            <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500"><Mail size={20} /></div>
            <div>
              <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Email</div>
              <div className="text-sm text-slate-900 dark:text-white">Not provided</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
            <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500"><Phone size={20} /></div>
            <div>
              <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Phone</div>
              <div className="text-sm text-slate-900 dark:text-white">Not provided</div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard title="Location">
        <div className="space-y-6 mt-4">
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
            <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500"><MapPin size={20} /></div>
            <div>
              <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Address</div>
              <div className="text-sm text-slate-900 dark:text-white">Not provided</div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  </div>
);

const SyllabusView = ({ onSelect }: { onSelect: () => void }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Smart Syllabus</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">All syllabus versions across courses.</p>
      </div>
      <button className="glass-button bg-blue-600 text-white border-blue-600 hover:bg-blue-700 flex items-center gap-2">
        <Plus size={18} /> Create new Syllabus
      </button>
    </div>

    <GlassCard className="p-0 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-slate-400 dark:text-slate-500 text-[10px] font-bold tracking-widest uppercase border-b border-slate-100 dark:border-white/5">
            <th className="py-4 px-6">Title</th>
            <th className="py-4 px-6">Course</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6">Modules</th>
            <th className="py-4 px-6">Updated</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {[
            { id: '1', title: 'Syllabus 17', course: 'A-CourseTest2', status: 'DRAFT', modules: 1, updated: '01/04/2026' },
            { id: '2', title: 'ss1', course: 'MATH-101', status: 'DRAFT', modules: 1, updated: '01/04/2026' },
            { id: '3', title: 'Physics', course: 'MATH-101', status: 'DRAFT', modules: 1, updated: '01/04/2026' },
            { id: '4', title: 'Focus and Productivity Essentials', course: 'A-CourseTest1', status: 'PUBLISHED', modules: 0, updated: '25/03/2026' },
          ].map((s) => (
            <tr key={s.id} onClick={onSelect} className="border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">{s.title}</td>
              <td className="py-4 px-6 text-slate-500 dark:text-slate-400">{s.course}</td>
              <td className="py-4 px-6">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold",
                  s.status === 'PUBLISHED' ? "bg-green-50 dark:bg-green-600/20 text-green-600 dark:text-green-400" : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                )}>
                  {s.status}
                </span>
              </td>
              <td className="py-4 px-6 text-slate-500 dark:text-slate-400">{s.modules}</td>
              <td className="py-4 px-6 text-slate-400 dark:text-slate-500">{s.updated}</td>
              <td className="py-4 px-6 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"><Edit2 size={16} /></button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  </div>
);

const EmailView = () => (
  <div className="space-y-6">
    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">SMTP Configurations</h1>
    
    <GlassCard className="p-0 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-slate-400 dark:text-slate-500 text-[10px] font-bold tracking-widest uppercase border-b border-slate-100 dark:border-white/5">
            <th className="py-4 px-6">Organization</th>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-6">SMTP Host</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <td className="py-6 px-6 font-medium text-slate-900 dark:text-white">University of Kent</td>
            <td className="py-6 px-6">
              <span className="px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-600/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-500/30 text-xs font-bold">Active</span>
            </td>
            <td className="py-6 px-6 font-mono text-slate-500 dark:text-slate-400">smtp.hostinger.com:587</td>
            <td className="py-6 px-6 text-right">
              <div className="flex justify-end gap-2">
                <button className="glass-button flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"><Eye size={14} /> View</button>
                <button className="glass-button flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"><Edit2 size={14} /> Edit</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </GlassCard>
  </div>
);

const SyllabusDetailView = ({ onBack }: { onBack: () => void }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeft size={20} />
      </button>
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Syllabus 17</h1>
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 text-[10px] font-bold">DRAFT</span>
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-xs">Description 17</p>
      </div>
      <div className="ml-auto flex gap-3">
        <button className="glass-button text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Create Outcome</button>
        <button className="glass-button text-xs bg-blue-600 text-white border-blue-600 hover:bg-blue-700">Save</button>
        <button className="glass-button text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Publish</button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
      {/* Modules Column */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">Modules</h3>
          <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
        </div>
        <div className="glass-card flex-1 p-4 space-y-4 overflow-y-auto">
          <button className="w-full py-2 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-lg text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:border-slate-200 dark:hover:border-white/10 hover:text-slate-600 dark:hover:text-slate-300 transition-all">
            + Add module
          </button>
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 dark:from-blue-600/10 to-transparent border border-blue-100 dark:border-blue-500/20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-600/30 flex items-center justify-center text-[8px] font-bold text-blue-600 dark:text-blue-400">!</div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">MO1</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Desc1</div>
          </div>
        </div>
      </div>

      {/* Learning Units Column */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">Learning units</h3>
          <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
        </div>
        <div className="glass-card flex-1 p-4 space-y-4 overflow-y-auto">
          <button className="w-full py-2 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-lg text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:border-slate-200 dark:hover:border-white/10 hover:text-slate-600 dark:hover:text-slate-300 transition-all">
            + Add unit
          </button>
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 dark:from-blue-600/10 to-transparent border border-blue-100 dark:border-blue-500/20 flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-600/30 flex items-center justify-center text-[10px] font-bold text-blue-600 dark:text-blue-400">1.1</div>
            <span className="text-xs font-bold text-slate-900 dark:text-white">LU1</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center gap-3 opacity-60">
            <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-400">1.2</div>
            <span className="text-xs font-bold text-slate-900 dark:text-white">LU2</span>
          </div>
        </div>
      </div>

      {/* Detail Column */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">LU1</h3>
          <Trash2 size={14} className="text-red-400 hover:text-red-600 cursor-pointer" />
        </div>
        <div className="glass-card flex-1 p-6 space-y-8 overflow-y-auto">
          <div>
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Optional description</label>
            <input type="text" className="glass-input mt-2 text-xs" placeholder="Add description..." />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Unit Resources</h4>
              <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"><Info size={12} /></button>
            </div>
            <div className="space-y-2">
              {['Learning Assets', 'Concepts', 'Learning Outcomes'].map(res => (
                <div key={res} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20" />
                    <span className="text-xs text-slate-600 dark:text-slate-300">{res}</span>
                  </div>
                  <button className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline">Manage</button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Learning Steps</h4>
              <button className="glass-button py-1 px-2 text-[8px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">+ Add step</button>
            </div>
            <div className="space-y-3">
              {[
                { id: '1', type: 'Coursework', title: 'Course werk 1', color: 'orange' },
                { id: '2', type: 'Assessment', title: 'assesment 1', color: 'purple' },
                { id: '3', type: 'Activity', title: 'activity 1', color: 'green' },
              ].map(step => (
                <div key={step.id} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-slate-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">{step.id}</div>
                  <div>
                    <div className={cn("text-[8px] font-bold uppercase px-1.5 py-0.5 rounded w-fit", `bg-neon-${step.color}/10 text-neon-${step.color}`)}>
                      {step.type}
                    </div>
                    <div className="text-xs font-medium mt-1 text-slate-900 dark:text-white">{step.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RegistrationsView = () => (
  <div className="space-y-6">
    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Registrations</h1>
    <GlassCard className="p-12 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-600">
        <UserPlus size={32} />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">No pending registrations</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-xs">New user registration requests will appear here for approval.</p>
      </div>
    </GlassCard>
  </div>
);

const LibraryView = () => (
  <div className="space-y-6">
    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Library</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <GlassCard key={i} className="p-6 space-y-4 group cursor-pointer hover:border-blue-200 dark:hover:border-blue-500/50 transition-all">
          <div className="aspect-video rounded-xl bg-slate-50 dark:bg-white/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen size={32} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-400 transition-all" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white">Resource Collection {i}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">12 documents • 4 videos</p>
          </div>
        </GlassCard>
      ))}
    </div>
  </div>
);

const AssignmentsView = () => (
  <div className="space-y-6">
    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Assignments</h1>
    <GlassCard className="p-0 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-slate-400 dark:text-slate-500 text-[10px] font-bold tracking-widest uppercase border-b border-slate-100 dark:border-white/5">
            <th className="py-4 px-6">Title</th>
            <th className="py-4 px-6">Course</th>
            <th className="py-4 px-6">Due Date</th>
            <th className="py-4 px-6">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">Final Project Proposal</td>
            <td className="py-4 px-6 text-slate-500 dark:text-slate-400">CS-101</td>
            <td className="py-4 px-6 text-slate-400 dark:text-slate-500">April 15, 2026</td>
            <td className="py-4 px-6">
              <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400 text-[10px] font-bold">IN REVIEW</span>
            </td>
          </tr>
        </tbody>
      </table>
    </GlassCard>
  </div>
);

const CoursesView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Courses</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">All courses in the organization.</p>
      </div>
      <button className="glass-button bg-blue-600 text-white border-blue-600 hover:bg-blue-700 flex items-center gap-2">
        <Plus size={18} /> Create Course
      </button>
    </div>

    <GlassCard className="p-0 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-slate-400 dark:text-slate-500 text-[10px] font-bold tracking-widest uppercase border-b border-slate-100 dark:border-white/5">
            <th className="py-4 px-6">Name</th>
            <th className="py-4 px-6">Department</th>
            <th className="py-4 px-6">Groups</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {MOCK_COURSES.map((course) => (
            <tr key={course.id} className="border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">{course.name}</td>
              <td className="py-4 px-6 text-slate-500 dark:text-slate-400">{course.department}</td>
              <td className="py-4 px-6 text-slate-500 dark:text-slate-400">{course.groups}</td>
              <td className="py-4 px-6 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"><FileText size={16} /></button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"><Edit2 size={16} /></button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  </div>
);

const SignupView = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-lg p-10 space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Create your account</h1>
          <p className="text-slate-500 dark:text-slate-400">Fill in the form below</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">First name</label>
              <input type="text" placeholder="Enter your first name" className="glass-input" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Last name</label>
              <input type="text" placeholder="Enter your last name" className="glass-input" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Email</label>
            <input type="email" defaultValue="super-admin@dev.aruva.awtg.co.uk" className="glass-input" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Password</label>
            <input type="password" placeholder="••••••••" className="glass-input" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-[10px] text-green-600 dark:text-green-400">
              <div className="flex items-center gap-1"><CheckCircle2 size={10} /> At least 8 characters</div>
              <div className="flex items-center gap-1"><CheckCircle2 size={10} /> Number 0-9</div>
              <div className="flex items-center gap-1"><CheckCircle2 size={10} /> Letter A-Z</div>
              <div className="flex items-center gap-1"><CheckCircle2 size={10} /> Letter a-z</div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Confirm password</label>
            <input type="password" placeholder="Confirm password" className="glass-input" />
          </div>
          
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Select your role(s) <span className="text-red-500">*</span></label>
            <div className="flex gap-4">
              {['Staff', 'Student', 'Researcher'].map(role => (
                <label key={role} className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-slate-200 dark:border-white/10 group-hover:border-blue-400 transition-colors flex items-center justify-center">
                    {role === 'Staff' && <div className="w-2 h-2 bg-blue-600 rounded-sm" />}
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{role}</span>
                </label>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">Note: that some selectors are mutual exclusive.</p>
          </div>

          <button type="submit" className="w-full py-3 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 font-bold rounded-lg border border-slate-200 dark:border-white/5 cursor-not-allowed">
            SUBMIT
          </button>
        </form>

        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account? <button onClick={onBack} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Login</button>
        </div>
      </motion.div>
    </div>
  );
};

const LoginView = ({ onLogin, onSignup }: { onLogin: () => void, onSignup: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-10 space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back!</h1>
          <div className="flex justify-center gap-4 pt-4">
            <button className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10">
              <img src="https://www.google.com/favicon.ico" className="w-6 h-6" alt="Google" referrerPolicy="no-referrer" />
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10">
              <img src="https://www.microsoft.com/favicon.ico" className="w-6 h-6" alt="Microsoft" referrerPolicy="no-referrer" />
            </button>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Email</label>
            <input type="email" defaultValue="super-admin@dev.aruva.awtg.co.uk" className="glass-input" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} defaultValue="password" className="glass-input pr-10" />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="text-right">
            <button type="button" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</button>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all active:scale-[0.98]">
            LOG IN
          </button>
        </form>

        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          New to our platform? <button onClick={onSignup} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Sign up now</button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentView, setCurrentView] = useState<View>('login');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (currentView === 'login') {
    return (
      <div className="relative">
        <button 
          onClick={toggleTheme}
          className="fixed top-4 right-4 p-2 glass-button z-50 text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <LoginView onLogin={() => setCurrentView('dashboard')} onSignup={() => setCurrentView('signup')} />
      </div>
    );
  }

  if (currentView === 'signup') {
    return (
      <div className="relative">
        <button 
          onClick={toggleTheme}
          className="fixed top-4 right-4 p-2 glass-button z-50 text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <SignupView onBack={() => setCurrentView('login')} />
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView theme={theme} />;
      case 'users': return <UsersView />;
      case 'registrations': return <RegistrationsView />;
      case 'departments': return <DepartmentsView />;
      case 'groups': return <GroupsView />;
      case 'roles': return <RolesView />;
      case 'apikeys': return <APIKeysView />;
      case 'details': return <DetailsView />;
      case 'syllabus': return <SyllabusView onSelect={() => setCurrentView('syllabus-detail')} />;
      case 'syllabus-detail': return <SyllabusDetailView onBack={() => setCurrentView('syllabus')} />;
      case 'email': return <EmailView />;
      case 'courses': return <CoursesView />;
      case 'library': return <LibraryView />;
      case 'assignments': return <AssignmentsView />;
      default: return <DashboardView theme={theme} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white/80 dark:bg-[#0a0a1a]/80 backdrop-blur-2xl border-r border-slate-100 dark:border-white/5 transition-transform duration-300",
        !isSidebarOpen && "-translate-x-full"
      )}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Activity className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">ARUVA AI</span>
        </div>

        <nav className="px-3 py-4 space-y-1 overflow-y-auto h-[calc(100vh-160px)]">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          
          <SidebarCategory label="User Management" />
          <SidebarItem icon={Users} label="Users" active={currentView === 'users'} onClick={() => setCurrentView('users')} />
          <SidebarItem icon={UserPlus} label="Registrations" active={currentView === 'registrations'} onClick={() => setCurrentView('registrations')} />
          <SidebarItem icon={ShieldCheck} label="Roles & Perms" active={currentView === 'roles'} onClick={() => setCurrentView('roles')} />
          
          <SidebarCategory label="Organization" />
          <SidebarItem icon={Info} label="Details" active={currentView === 'details'} onClick={() => setCurrentView('details')} />
          <SidebarItem icon={Key} label="API Keys" active={currentView === 'apikeys'} onClick={() => setCurrentView('apikeys')} />
          <SidebarItem icon={Mail} label="Email / SMTP" active={currentView === 'email'} onClick={() => setCurrentView('email')} />
          <SidebarItem icon={Building2} label="Departments" active={currentView === 'departments'} onClick={() => setCurrentView('departments')} />
          <SidebarItem icon={Users2} label="Groups" active={currentView === 'groups'} onClick={() => setCurrentView('groups')} />
          <SidebarItem icon={BookOpen} label="Courses" active={currentView === 'courses'} onClick={() => setCurrentView('courses')} />
          <SidebarItem icon={FileText} label="Smart Syllabus" active={currentView === 'syllabus'} onClick={() => setCurrentView('syllabus')} />
          
          <SidebarCategory label="Assistants" />
          <SidebarItem icon={Library} label="Library" active={currentView === 'library'} onClick={() => setCurrentView('library')} />
          <SidebarItem icon={ClipboardList} label="Assignments" active={currentView === 'assignments'} onClick={() => setCurrentView('assignments')} />
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 dark:border-white/5">
          <button 
            onClick={() => setCurrentView('login')}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Back to App</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        isSidebarOpen ? "pl-64" : "pl-0"
      )}>
        {/* Navbar */}
        <header className="sticky top-0 z-40 bg-white/40 dark:bg-[#0a0a1a]/40 backdrop-blur-md border-b border-slate-100 dark:border-white/5 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <LayoutDashboard size={20} />
            </button>
            <div className="text-sm font-medium text-slate-400 dark:text-slate-400">Admin Panel</div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
              <button className="hover:text-slate-900 dark:hover:text-white transition-colors">Assistants</button>
              <button className="text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10">Admin Panel</button>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"><Settings size={20} /></button>
              <button className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold border border-blue-400 text-white shadow-sm">S</button>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
