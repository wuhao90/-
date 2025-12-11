import React from 'react';
import { Profile } from './types';
import { 
  LayoutGrid, 
  Users, 
  Globe, 
  Box, 
  CreditCard, 
  Settings, 
  Smartphone,
  Puzzle,
  Zap,
  Layout
} from 'lucide-react';

export const PROFILES: Profile[] = [
  {
    id: "P-363",
    name: "Marketing Campaign A",
    platform: "windows",
    browser: "chrome",
    status: "Ready",
    proxy: "socks5://178.92.10...",
    proxyLocation: "TH, Private Proxy",
    proxyFlag: "🇹🇭",
    tags: [],
    lastActive: "2 hours ago"
  },
  {
    id: "P-362",
    name: "US_West_Outreach",
    platform: "windows",
    browser: "chrome",
    status: "Ready",
    proxy: "socks5://38.111.31....",
    proxyLocation: "US, Private Proxy",
    proxyFlag: "🇺🇸",
    tags: [],
    lastActive: "1 day ago"
  },
  {
    id: "P-361",
    name: "Social Media Manager",
    platform: "windows",
    browser: "chrome",
    status: "Ready",
    proxy: "socks5://38.84.9.36...",
    proxyLocation: "US, Private Proxy",
    proxyFlag: "🇺🇸",
    notes: "snapchat",
    tags: [],
    lastActive: "3 days ago"
  },
  {
    id: "P-360",
    name: "Brazil_Affiliate",
    platform: "windows",
    browser: "chrome",
    status: "Ready",
    proxy: "socks5://166.0.122....",
    proxyLocation: "BR, Private Proxy",
    proxyFlag: "🇧🇷",
    tags: ["marketing"],
    lastActive: "Just now"
  },
  {
    id: "P-359",
    name: "Poland_Ecom",
    platform: "windows",
    browser: "chrome",
    status: "Ready",
    proxy: "socks5://85.237.21...",
    proxyLocation: "PL, Private Proxy",
    proxyFlag: "🇵🇱",
    tags: ["marketing", "sales"],
    lastActive: "5 mins ago"
  },
  {
    id: "P-358",
    name: "US_East_Testing",
    platform: "windows",
    browser: "chrome",
    status: "Ready",
    proxy: "socks5://38.84.9.36...",
    proxyLocation: "US, Private Proxy",
    proxyFlag: "🇺🇸",
    tags: [],
    lastActive: "1 week ago"
  },
   {
    id: "P-357",
    name: "Generic_Fallback",
    platform: "windows",
    browser: "chrome",
    status: "Ready",
    proxy: "--",
    proxyLocation: "--",
    proxyFlag: "",
    tags: [],
    lastActive: "Unknown"
  }
];

export const NAV_ITEMS = [
  { label: "Profile", icon: <LayoutGrid size={18} />, active: true },
  { label: "Proxies", icon: <Globe size={18} /> },
  { label: "Cloud Phone", icon: <Smartphone size={18} /> },
  { label: "Extensions", icon: <Puzzle size={18} /> },
  { label: "Automation", icon: <Zap size={18} />, badge: "●" },
  { label: "Teams", icon: <Users size={18} /> },
  { label: "Billing", icon: <CreditCard size={18} />, badge: "SALE" },
  { label: "Partner", icon: <Box size={18} /> },
];
