
import Link from 'next/link';
import { BarChart, HeartPulse, LayoutDashboard, PanelLeft, Search } from 'lucide-react';
import { user } from '@/lib/data';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/logo';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="group-data-[variant=sidebar]:bg-sidebar group-data-[variant=sidebar]:text-sidebar-foreground"
        >
          <SidebarHeader>
            <Logo className="hidden group-data-[state=expanded]:flex" />
            <SidebarTrigger className="group-data-[state=expanded]:hidden" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard" passHref>
                    <SidebarMenuButton tooltip="Dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/workouts" passHref>
                    <SidebarMenuButton tooltip="Workouts">
                        <HeartPulse />
                        <span>Workouts</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/reports" passHref>
                    <SidebarMenuButton tooltip="Reports">
                        <BarChart />
                        <span>Reports</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="items-center group-data-[state=collapsed]:p-0 group-data-[state=collapsed]:pt-2">
            <div className="flex items-center gap-3 w-full group-data-[state=collapsed]:justify-center">
              <div className="group-data-[state=expanded]:hidden">
                <UserNav user={user} />
              </div>
              <div className="hidden group-data-[state=expanded]:flex group-data-[state=expanded]:flex-col">
                <span className="text-sm font-semibold">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
              <div className="hidden ml-auto group-data-[state=expanded]:inline-block">
                <UserNav user={user} />
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
            <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sm:px-6">
                <SidebarTrigger className="md:hidden"/>
                <div className="w-full flex-1">
                {/* Can add search here if needed */}
                </div>
                {/* Mobile UserNav if needed */}
            </header>
            <main className="flex-1 overflow-auto p-4 sm:p-6 bg-background/80">
                {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
