
'use client';
import PageHeader from "@/components/shared/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { AppearanceForm } from "@/components/settings/AppearanceForm";
import { NotificationsForm } from "@/components/settings/NotificationsForm";
import { DataManagement } from "@/components/settings/DataManagement";
import { useUser } from "@/context/UserContext";
import { getPerksForLevel, getNextPerk } from "@/lib/formulas";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Award, Lock } from "lucide-react";

function PerksDisplay() {
    const { user } = useUser();
    if (!user) return null;

    const unlockedPerks = getPerksForLevel(user.level);
    const nextPerk = getNextPerk(user.level);

    return (
        <LiquidGlassCard className="p-0">
            <div className="p-6">
                <h3 className="font-headline text-xl font-bold text-white">Unlocked Perks</h3>
                <p className="text-muted-foreground text-sm">
                    As you level up, you gain access to new cosmetic and convenience features.
                </p>
            </div>
            <div className="p-6 space-y-4">
                {unlockedPerks.map(perk => (
                    <div key={perk.name} className="flex items-center gap-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <perk.icon className="h-6 w-6 text-green-400" />
                        <div>
                            <h4 className="font-semibold text-white">{perk.name}</h4>
                            <p className="text-sm text-muted-foreground">{perk.description}</p>
                        </div>
                        <Badge variant="secondary" className="ml-auto">Lvl {perk.level}</Badge>
                    </div>
                ))}
            </div>
            {nextPerk && (
                 <div className="border-t border-white/10 p-6">
                     <h4 className="font-semibold text-white flex items-center gap-2"><Lock className="h-4 w-4"/> Next Unlock at Level {nextPerk.level}</h4>
                     <p className="text-muted-foreground text-sm mt-1">{nextPerk.name}: {nextPerk.description}</p>
                      <Link href="/character">
                        <Button variant="link" className="px-0">View your progress</Button>
                      </Link>
                 </div>
            )}
        </LiquidGlassCard>
    )
}


export default function SettingsPage() {
    return (
        <>
            <PageHeader
                title="Settings"
                description="Manage your account, preferences, and notifications."
            />
            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="perks">Perks</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="space-y-4">
                    <ProfileForm />
                </TabsContent>
                <TabsContent value="appearance" className="space-y-4">
                    <AppearanceForm />
                </TabsContent>
                <TabsContent value="notifications" className="space-y-4">
                    <NotificationsForm />
                </TabsContent>
                <TabsContent value="perks" className="space-y-4">
                    <PerksDisplay />
                </TabsContent>
                 <TabsContent value="data" className="space-y-4">
                    <DataManagement />
                </TabsContent>
            </Tabs>
        </>
    );
}
