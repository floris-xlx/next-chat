import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id?: string | null;
  username?: string | null;
  profile_picture?: string | null;
  email?: string | null;
  organization?: string | null;
  full_name?: string | null;
  organization_profile_pic?: string | null;
  organizations?: string[] | null;
  organization_tier?: string | null;
  display_name?: string | null;
  default_organization?: string | null;
  default_scope?: string | null;
  avatar?: string | null;
  organization_id?: string | null;
}

interface Auth {
  mfa_enabled?: boolean;
  totp_secret?: string;
  totp_email?: string;
  last_mfa_challenge_at?: number;
  awaiting_mfa_challenge?: boolean;
}

interface Settings {
  allow_inline_trade_management_actions?: boolean;
  challenge_on_guide_publish?: boolean;
  challenge_on_member_management_action?: boolean;
  challenge_on_new_device?: boolean;
  created_at?: string;
  id?: number;
  link_to_discord?: string | null;
  notifications?: boolean;
  notify_notification_amount_on_page_load?: boolean;
  notify_on_bank_holiday?: boolean;
  notify_on_econ_events_all_impact?: boolean;
  notify_on_econ_events_high_impact?: boolean;
  notify_on_market_close?: boolean;
  notify_on_market_open?: boolean;
  notify_on_mention_trade_thread?: boolean;
  notify_on_new_trade?: boolean;
  notify_on_session_rotate?: boolean;
  notify_on_support_ticket_new_message?: boolean;
  notify_on_support_ticket_status_update?: boolean;
  public_organization?: string;
  public_profile?: boolean;
  public_profile_picture?: string | null;
  public_user_id?: string;
  user_id?: string;
}

interface UserStore {
  user?: User;
  auth?: Auth;
  settings?: Settings;

  // actions
  setId: (id: string) => void;
  setUsername: (username: string) => void;
  setProfilePicture: (profile_picture: string) => void;
  setEmail: (email: string) => void;
  setOrganization: (organization: string) => void;
  setFullName: (full_name: string) => void;
  setOrganizationProfilePic: (organization_profile_pic: string) => void;
  setOrganizations: (organizations: string[]) => void;
  setOrganizationTier: (organization_tier: string) => void;
  setDisplayName: (display_name: string) => void;
  setDefaultOrganization: (default_organization: string) => void;
  setDefaultScope: (default_scope: string) => void;
  setAvatar: (avatar: string) => void;
  setOrganizationId: (organization_id: string) => void;

  // auth actions
  setMfaEnabled: (mfa_enabled: boolean) => void;
  setTotpSecret: (totp_secret: string) => void;
  setTotpEmail: (totp_email: string) => void;
  setLastMfaChallengeAt: (last_mfa_challenge_at: number) => void;
  setAwaitingMfaChallenge: (awaiting_mfa_challenge: boolean) => void;

  // settings actions
  setSettingsProperty: (property: keyof Settings, value: any) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => {

      return {
        user: {
          id: null,
          username: null,
          profile_picture: null,
          email: null,
          organization: null,
          full_name: null,
          organization_profile_pic: null,
          organizations: null,
          organization_tier: null,
          display_name: null,
          default_organization: null,
          default_scope: null,
          avatar: null,
          organization_id: null,
        },
        auth: {
          mfa_enabled: null,
          totp_secret: null,
          totp_email: null,
          last_mfa_challenge_at: null,
          awaiting_mfa_challenge: null,
        },
        settings: {
          allow_inline_trade_management_actions: false,
          challenge_on_guide_publish: false,
          challenge_on_member_management_action: false,
          challenge_on_new_device: false,
          created_at: null,
          id: null,
          link_to_discord: null,
          notifications: true,
          notify_notification_amount_on_page_load: false,
          notify_on_bank_holiday: false,
          notify_on_econ_events_all_impact: false,
          notify_on_econ_events_high_impact: false,
          notify_on_market_close: false,
          notify_on_market_open: false,
          notify_on_mention_trade_thread: false,
          notify_on_new_trade: false,
          notify_on_session_rotate: false,
          notify_on_support_ticket_new_message: true,
          notify_on_support_ticket_status_update: true,
          public_organization: null,
          public_profile: true,
          public_profile_picture: null,
          public_user_id: null,
          user_id: null,
        },

        setUserProperty: (property: keyof User, value: any) => set((state) => ({
          user: {
            ...state.user,
            [property]: value,
          }
        })),

        setId: (id: string) => set((state) => ({
          user: {
            ...state.user,
            id: id,
          }
        })),

        setUsername: (username: string) => set((state) => ({
          user: {
            ...state.user,
            username: username,
          }
        })),

        setProfilePicture: (profile_picture: string) => set((state) => ({
          user: {
            ...state.user,
            profile_picture: profile_picture,
          }
        })),

        setEmail: (email: string) => set((state) => ({
          user: {
            ...state.user,
            email: email,
          }
        })),

        setOrganization: (organization: string) => set((state) => ({
          user: {
            ...state.user,
            organization: organization,
          }
        })),

        setFullName: (full_name: string) => set((state) => ({
          user: {
            ...state.user,
            full_name: full_name,
          }
        })),

        setOrganizationProfilePic: (organization_profile_pic: string) => set((state) => ({
          user: {
            ...state.user,
            organization_profile_pic: organization_profile_pic,
          }
        })),

        setOrganizations: (organizations: string[]) => set((state) => ({
          user: {
            ...state.user,
            organizations: Array.from(new Set(organizations)),
          }
        })),

        setOrganizationTier: (organization_tier: string) => set((state) => ({
          user: {
            ...state.user,
            organization_tier: organization_tier,
          }
        })),

        setDisplayName: (display_name: string) => set((state) => ({
          user: {
            ...state.user,
            display_name: display_name,
          }
        })),

        setDefaultOrganization: (default_organization: string) => set((state) => ({
          user: {
            ...state.user,
            default_organization: default_organization,
          }
        })),

        setDefaultScope: (default_scope: string) => set((state) => ({
          user: {
            ...state.user,
            default_scope: default_scope,
          }
        })),

        setAvatar: (avatar: string) => set((state) => ({
          user: {
            ...state.user,
            avatar: avatar,
          }
        })),

        setOrganizationId: (organization_id: string) => set((state) => ({
          user: {
            ...state.user,
            organization_id: organization_id,
          }
        })),

        // auth setters
        setMfaEnabled: (mfa_enabled: boolean) => set((state) => ({
          auth: {
            ...state.auth,
            mfa_enabled: mfa_enabled,
          }
        })),

        setTotpSecret: (totp_secret: string) => set((state) => ({
          auth: {
            ...state.auth,
            totp_secret: totp_secret,
          }
        })),

        setTotpEmail: (totp_email: string) => set((state) => ({
          auth: {
            ...state.auth,
            totp_email: totp_email,
          }
        })),

        setLastMfaChallengeAt: (last_mfa_challenge_at: number) => set((state) => ({
          auth: {
            ...state.auth,
            last_mfa_challenge_at: last_mfa_challenge_at,
          }
        })),

        setAwaitingMfaChallenge: (awaiting_mfa_challenge: boolean) => set((state) => ({
          auth: {
            ...state.auth,
            awaiting_mfa_challenge: awaiting_mfa_challenge,
          }
        })),

        // settings setters
        setSettingsProperty: (property: keyof Settings, value: any) => set((state) => ({
          settings: {
            ...state.settings,
            [property]: value,
          }
        })),
      };
    },

    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);