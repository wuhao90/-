import React from 'react';

export interface Profile {
  id: string;
  name: string;
  platform: 'windows' | 'mac' | 'linux';
  browser: 'chrome' | 'firefox';
  status: 'Ready' | 'Active' | 'Error';
  proxy: string;
  proxyLocation: string;
  proxyFlag: string;
  account?: string;
  notes?: string;
  tags: string[];
  lastActive?: string;
}

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  hasSubmenu?: boolean;
  badge?: number | string;
}

export type SortOrder = 'asc' | 'desc' | null;