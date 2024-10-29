import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface View {
    currentNotificationHeader: string | null;
    currentPendingTradesFilter: string[] | null;
    currentPendingTradesSearchQuery: string | null;
    currentPendingTradesSortKey: string | null;
    currentPage: string | null;
    currentSection: string | null;
    currentNavigationTab: string | null;
    isInUserDrawer: boolean;
    isInNotificationDrawer: boolean;
    isInFeedbackDrawer: boolean;
    isInFeedbackModal: boolean;
    isHeaderMinified: boolean;
    isInSettingsNavDrawer: boolean;
    currentAccountOverviewNavTab: string | null;
    isInAccountOverviewNavTabDrawer: boolean;
    isInOrganizationScopeView: boolean;
    isInAccountScopeView: boolean;
    isInAccountOverviewTeamsContextDrawer: boolean;
    isInInvalidateTradeDialog: boolean;
    isInArchivedTrades: boolean; // New state added
}

interface Scope {
    isInOrganizationScopeView: boolean;
    isInAccountScopeView: boolean;

    route: string | null;
    prevRoute: string | null;
    prevScopeView: string | null;
    isOrganizationSettingsTab: string | null;
}

interface Drawer {
    isInDefaultTeamDrawer: boolean;
    isInSortByPendingTradesDrawer: boolean;
    isInDatePickerPendingTradesDrawer: boolean;
    isInFilterByTradeStatusPendingTradesDrawer: boolean;
    isInOrganizationDropdown: boolean;
    isInOrganizationDrawer: boolean;
    isInOrganizationMemberDropdown: boolean;
    isInOrganizationMemberDrawer: boolean;
    isInPendingTradesActionDrawer: boolean;
    isInPendingTradesActionDropdown: boolean;
    isInInvalidateTradeDrawer: boolean;
    isInImportInvoiceDrawer: boolean;
    isInTradeInvalidationConfirmationDrawer: boolean;
    isInTradeDrilldownTradeStatusDrawer: boolean;
}

interface Dialog {
    isInImportInvoiceDialog: boolean;
    isInInvalidateTradeDialog: boolean;
}

interface Combobox {
    isInTradeDrilldownTradeStatusComboBox: boolean;
    isInTradeDrilldownTradeStatusDrawer: boolean;
}

interface ViewStore {
    view: View;
    scope: Scope;
    drawer: Drawer;
    dialog: Dialog;
    combobox: Combobox;

    setCurrentNotificationHeader: (header: string | null) => void;
    setCurrentPendingTradesFilter: (filter: string[] | null) => void;
    setCurrentPendingTradesSearchQuery: (query: string | null) => void;
    setCurrentPendingTradesSortKey: (sortKey: string | null) => void;
    setCurrentPage: (page: string | null) => void;
    setCurrentSection: (section: string | null) => void;
    setCurrentNavigationTab: (tab: string | null) => void;
    setIsInUserDrawer: (isInDrawer: boolean) => void;
    setIsInNotificationDrawer: (isInDrawer: boolean) => void;
    setIsInFeedbackDrawer: (isInDrawer: boolean) => void;
    setIsInFeedbackModal: (isInModal: boolean) => void;
    setHeaderMinified: (isMinified: boolean) => void;
    setIsInSettingsNavDrawer: (isInDrawer: boolean) => void;
    setAllDrawersClosed: () => void;
    setCurrentAccountOverviewNavTab: (tab: string | null) => void;
    setIsInAccountOverviewNavTabDrawer: (isInDrawer: boolean) => void;
    setIsInOrganizationScopeView: (isInView: boolean) => void;
    setIsInAccountScopeView: (isInView: boolean) => void;

    setIsInAccountOverviewTeamsContextDrawer: (isInDrawer: boolean) => void;
    setRoute: (route: string | null) => void;
    setPrevRoute: (prevRoute: string | null) => void;
    setPrevScopeView: (prevScopeView: string | null) => void;
    setIsInDefaultTeamDrawer: (isInDrawer: boolean) => void;
    setIsInSortByPendingTradesDrawer: (isInDrawer: boolean) => void;
    setIsInDatePickerPendingTradesDrawer: (isInDrawer: boolean) => void;
    setIsInFilterByTradeStatusPendingTradesDrawer: (isInDrawer: boolean) => void;
    setIsOrganizationSettingsTab: (tab: string | null) => void;
    setIsInOrganizationDropdown: (isInDropdown: boolean) => void;
    setIsInOrganizationDrawer: (isInDrawer: boolean) => void;
    setIsInOrganizationMemberDropdown: (isInDropdown: boolean) => void;
    setIsInOrganizationMemberDrawer: (isInDrawer: boolean) => void;
    setIsInPendingTradesActionDrawer: (isInDrawer: boolean) => void;
    setIsInPendingTradesActionDropdown: (isInDropdown: boolean) => void;
    setIsInInvalidateTradeDialog: (isInDialog: boolean) => void;
    setIsInInvalidateTradeDrawer: (isInDrawer: boolean) => void;
    setIsInImportInvoiceDialog: (isInDialog: boolean) => void;
    setIsInImportInvoiceDrawer: (isInDrawer: boolean) => void;
    setIsInTradeInvalidationConfirmationDrawer: (isInDrawer: boolean) => void;
    setIsInTradeDrilldownTradeStatusDrawer: (isInDrawer: boolean) => void;
    setIsInTradeDrilldownTradeStatusComboBox: (isInComboBox: boolean) => void;
    setIsInArchivedTrades: (isInArchived: boolean) => void; // New setter added
}

export const useViewStore = create<ViewStore>()(
    persist(
        (set) => ({
            view: {
                currentNotificationHeader: null,
                currentPendingTradesFilter: null,
                currentPendingTradesSearchQuery: null,
                currentPendingTradesSortKey: null,
                currentPage: null,
                currentSection: null,
                currentNavigationTab: 'overview',
                isInUserDrawer: false,
                isInNotificationDrawer: false,
                isInFeedbackDrawer: false,
                isInFeedbackModal: false,
                isHeaderMinified: false,
                isInSettingsNavDrawer: false,
                currentAccountOverviewNavTab: null,
                isInAccountOverviewNavTabDrawer: false,
                isInOrganizationScopeView: false,
                isInAccountScopeView: true,
                isInAccountOverviewTeamsContextDrawer: false,
                isInInvalidateTradeDialog: false,
                isInArchivedTrades: false, // Default value set to false
            },
            scope: {
                isInOrganizationScopeView: false,
                isInAccountScopeView: true,

                route: null,
                prevRoute: null,
                prevScopeView: null,
                isOrganizationSettingsTab: 'organization_member_view',
            },
            drawer: {
                isInDefaultTeamDrawer: false,
                isInSortByPendingTradesDrawer: false,
                isInDatePickerPendingTradesDrawer: false,
                isInFilterByTradeStatusPendingTradesDrawer: false,
                isInOrganizationDropdown: false,
                isInOrganizationDrawer: false,
                isInOrganizationMemberDropdown: false,
                isInOrganizationMemberDrawer: false,
                isInPendingTradesActionDrawer: false,
                isInPendingTradesActionDropdown: false,
                isInInvalidateTradeDrawer: false,
                isInImportInvoiceDrawer: false,
                isInTradeInvalidationConfirmationDrawer: false,
                isInTradeDrilldownTradeStatusDrawer: false,
            },
            dialog: {
                isInImportInvoiceDialog: false,
                isInInvalidateTradeDialog: false,
            },
            combobox: {
                isInTradeDrilldownTradeStatusComboBox: false,
                isInTradeDrilldownTradeStatusDrawer: false,
            },
            setCurrentNotificationHeader: (header: string | null) => set((state) => ({
                view: {
                    ...state.view,
                    currentNotificationHeader: header,
                },
            })),
            setCurrentPendingTradesFilter: (filter: string[] | null) => set((state) => ({
                view: {
                    ...state.view,
                    currentPendingTradesFilter: filter,
                },
            })),
            setCurrentPendingTradesSearchQuery: (query: string | null) => set((state) => ({
                view: {
                    ...state.view,
                    currentPendingTradesSearchQuery: query,
                },
            })),
            setCurrentPendingTradesSortKey: (sortKey: string | null) => set((state) => ({
                view: {
                    ...state.view,
                    currentPendingTradesSortKey: sortKey,
                },
            })),
            setCurrentPage: (page: string | null) => set((state) => ({
                view: {
                    ...state.view,
                    currentPage: page,
                },
            })),
            setCurrentSection: (section: string | null) => set((state) => ({
                view: {
                    ...state.view,
                    currentSection: section,
                },
            })),
            setCurrentNavigationTab: (tab: string | null) => set((state) => ({
                view: {
                    ...state.view,
                    currentNavigationTab: tab,
                },
            })),
            setCurrentAccountOverviewNavTab: (tab: string | null) => set((state) => ({
                view: {
                    ...state.view,
                    currentAccountOverviewNavTab: tab,
                },
            })),
            setIsInUserDrawer: (isInDrawer: boolean) => set((state) => ({
                view: {
                    ...state.view,
                    isInUserDrawer: isInDrawer,
                },
            })),
            setIsInNotificationDrawer: (isInDrawer: boolean) => set((state) => ({
                view: {
                    ...state.view,
                    isInNotificationDrawer: isInDrawer,
                },
            })),
            setIsInFeedbackDrawer: (isInDrawer: boolean) => set((state) => ({
                view: {
                    ...state.view,
                    isInFeedbackDrawer: isInDrawer,
                },
            })),
            setIsInFeedbackModal: (isInModal: boolean) => set((state) => ({
                view: {
                    ...state.view,
                    isInFeedbackModal: isInModal,
                },
            })),
            setHeaderMinified: (isMinified: boolean) => set((state) => ({
                view: {
                    ...state.view,
                    isHeaderMinified: isMinified,
                },
            })),
            setIsInSettingsNavDrawer: (isInDrawer: boolean) => set((state) => ({
                view: {
                    ...state.view,
                    isInSettingsNavDrawer: isInDrawer,
                },
            })),
            setIsInAccountOverviewNavTabDrawer: (isInDrawer: boolean) => set((state) => ({
                view: {
                    ...state.view,
                    isInAccountOverviewNavTabDrawer: isInDrawer,
                },
            })),
            setIsInAccountOverviewTeamsContextDrawer: (isInDrawer: boolean) => set((state) => ({
                view: {
                    ...state.view,
                    isInAccountOverviewTeamsContextDrawer: isInDrawer,
                },
            })),
            setIsInOrganizationScopeView: (isInView: boolean) => set((state) => ({
                view: {
                    ...state.view,
                    isInOrganizationScopeView: isInView,
                    isInAccountScopeView: !isInView,

                },
                scope: {
                    ...state.scope,
                    isInOrganizationScopeView: isInView,
                    isInAccountScopeView: !isInView,

                },
            })),
            setIsInAccountScopeView: (isInView: boolean) => set((state) => ({
                view: {
                    ...state.view,
                    isInAccountScopeView: isInView,
                    isInOrganizationScopeView: !isInView,

                },
                scope: {
                    ...state.scope,
                    isInAccountScopeView: isInView,
                    isInOrganizationScopeView: !isInView,

                },
            })),
            setIsInArchivedTrades: (isInArchived: boolean) => set((state) => ({
                view: {
                    ...state.view,
                    isInArchivedTrades: isInArchived,
                },
            })),

            setRoute: (route: string | null) => set((state) => ({
                scope: {
                    ...state.scope,
                    route: route,
                },
            })),
            setPrevRoute: (prevRoute: string | null) => set((state) => ({
                scope: {
                    ...state.scope,
                    prevRoute: prevRoute,
                },
            })),
            setPrevScopeView: (prevScopeView: string | null) => set((state) => ({
                scope: {
                    ...state.scope,
                    prevScopeView: prevScopeView,
                },
            })),
            setIsInDefaultTeamDrawer: (isInDrawer: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInDefaultTeamDrawer: isInDrawer,
                },
            })),
            setIsInSortByPendingTradesDrawer: (isInDrawer: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInSortByPendingTradesDrawer: isInDrawer,
                },
            })),
            setIsInDatePickerPendingTradesDrawer: (isInDrawer: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInDatePickerPendingTradesDrawer: isInDrawer,
                },
            })),
            setIsInFilterByTradeStatusPendingTradesDrawer: (isInDrawer: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInFilterByTradeStatusPendingTradesDrawer: isInDrawer,
                },
            })),
            setIsInOrganizationDropdown: (isInDropdown: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInOrganizationDropdown: isInDropdown,
                },
            })),
            setIsInOrganizationDrawer: (isInDrawer: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInOrganizationDrawer: isInDrawer,
                },
            })),
            setIsInOrganizationMemberDropdown: (isInDropdown: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInOrganizationMemberDropdown: isInDropdown,
                },
            })),
            setIsInOrganizationMemberDrawer: (isInDrawer: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInOrganizationMemberDrawer: isInDrawer,
                },
            })),
            setIsInPendingTradesActionDrawer: (isInDrawer: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInPendingTradesActionDrawer: isInDrawer,
                },
            })),
            setIsInPendingTradesActionDropdown: (isInDropdown: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInPendingTradesActionDropdown: isInDropdown,
                },
            })),
            setIsOrganizationSettingsTab: (tab: string | null) => set((state) => ({
                scope: {
                    ...state.scope,
                    isOrganizationSettingsTab: tab,
                },
            })),
            setIsInInvalidateTradeDialog: (isInDialog: boolean) => set((state) => ({
                dialog: {
                    ...state.dialog,
                    isInInvalidateTradeDialog: isInDialog,
                },
            })),
            setIsInInvalidateTradeDrawer: (isInDrawer: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInInvalidateTradeDrawer: isInDrawer,
                },
            })),
            setIsInImportInvoiceDialog: (isInDialog: boolean) => set((state) => ({
                dialog: {
                    ...state.dialog,
                    isInImportInvoiceDialog: isInDialog,
                },
            })),
            setIsInImportInvoiceDrawer: (isInDrawer: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInImportInvoiceDrawer: isInDrawer,
                },
            })),
            setIsInTradeInvalidationConfirmationDrawer: (isInDrawer: boolean) => set((state) => ({
                drawer: {
                    ...state.drawer,
                    isInTradeInvalidationConfirmationDrawer: isInDrawer,
                },
            })),
            setIsInTradeDrilldownTradeStatusComboBox: (isInComboBox: boolean) => set((state) => ({
                combobox: {
                    ...state.combobox,
                    isInTradeDrilldownTradeStatusComboBox: isInComboBox,
                },
            })),
            setIsInTradeDrilldownTradeStatusDrawer: (isInDrawer: boolean) => set((state) => ({
                combobox: {
                    ...state.combobox,
                    isInTradeDrilldownTradeStatusDrawer: isInDrawer,
                },
            })),
            setAllDrawersClosed: () => set((state) => ({
                view: {
                    ...state.view,
                    isInUserDrawer: false,
                    isInNotificationDrawer: false,
                    isInFeedbackDrawer: false,
                    isInFeedbackModal: false,
                    isInSettingsNavDrawer: false,
                    isInAccountOverviewNavTabDrawer: false,
                    isInAccountOverviewTeamsContextDrawer: false,
                    isInInvalidateTradeDialog: false,
                    isInArchivedTrades: false, // Ensure this is also reset
                },
                drawer: {
                    ...state.drawer,
                    isInDefaultTeamDrawer: false,
                    isInSortByPendingTradesDrawer: false,
                    isInDatePickerPendingTradesDrawer: false,
                    isInFilterByTradeStatusPendingTradesDrawer: false,
                    isInOrganizationDropdown: false,
                    isInOrganizationDrawer: false,
                    isInOrganizationMemberDropdown: false,
                    isInOrganizationMemberDrawer: false,
                    isInPendingTradesActionDrawer: false,
                    isInPendingTradesActionDropdown: false,
                    isInInvalidateTradeDrawer: false,
                    isInImportInvoiceDrawer: false,
                    isInTradeInvalidationConfirmationDrawer: false,
                    isInTradeDrilldownTradeStatusDrawer: false,
                },
                dialog: {
                    ...state.dialog,
                    isInImportInvoiceDialog: false,
                    isInInvalidateTradeDialog: false,
                },
                combobox: {
                    ...state.combobox,
                    isInTradeDrilldownTradeStatusComboBox: false,
                    isInTradeDrilldownTradeStatusDrawer: false,
                },
            })),
        }),
        {
            name: 'view-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
