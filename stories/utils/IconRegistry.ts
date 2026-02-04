import React from 'react';
import {
    // Navigation
    HomeIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronLeftIcon,
    ChevronRightIcon,

    // Actions
    PlusIcon,
    XMarkIcon,
    CheckIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
    ArrowPathIcon,

    // Status
    InformationCircleIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon,

    // Communication
    EnvelopeIcon,
    BellIcon,
    ChatBubbleLeftIcon,

    // Common
    Cog6ToothIcon,
    UserIcon,
    DocumentIcon,
    FolderIcon,
    CalendarIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

/**
 * Central icon registry for all Heroicons used across the design system.
 * This provides a single source of truth for icon components.
 * 
 * Icons are pre-rendered with common className for size control.
 */
export const iconMap: Record<string, React.ReactNode> = {
    None: null,

    // Navigation
    Home: <HomeIcon className="w-5 h-5" />,
  ArrowLeft: <ArrowLeftIcon className="w-5 h-5" />,
  ArrowRight: <ArrowRightIcon className="w-5 h-5" />,
  ChevronDown: <ChevronDownIcon className="w-5 h-5" />,
  ChevronUp: <ChevronUpIcon className="w-5 h-5" />,
  ChevronLeft: <ChevronLeftIcon className="w-5 h-5" />,
  ChevronRight: <ChevronRightIcon className="w-5 h-5" />,

  // Actions
  Plus: <PlusIcon className="w-5 h-5" />,
  XMark: <XMarkIcon className="w-5 h-5" />,
  Check: <CheckIcon className="w-5 h-5" />,
  MagnifyingGlass: <MagnifyingGlassIcon className="w-5 h-5" />,
  Pencil: <PencilIcon className="w-5 h-5" />,
  Trash: <TrashIcon className="w-5 h-5" />,
  ArrowPath: <ArrowPathIcon className="w-5 h-5" />,

  // Status
  InformationCircle: <InformationCircleIcon className="w-5 h-5" />,
  CheckCircle: <CheckCircleIcon className="w-5 h-5" />,
  ExclamationCircle: <ExclamationCircleIcon className="w-5 h-5" />,
  ExclamationTriangle: <ExclamationTriangleIcon className="w-5 h-5" />,
  XCircle: <XCircleIcon className="w-5 h-5" />,

  // Communication
  Envelope: <EnvelopeIcon className="w-5 h-5" />,
  Bell: <BellIcon className="w-5 h-5" />,
  ChatBubbleLeft: <ChatBubbleLeftIcon className="w-5 h-5" />,

  // Common
  Cog6Tooth: <Cog6ToothIcon className="w-5 h-5" />,
  User: <UserIcon className="w-5 h-5" />,
  Document: <DocumentIcon className="w-5 h-5" />,
  Folder: <FolderIcon className="w-5 h-5" />,
  Calendar: <CalendarIcon className="w-5 h-5" />,
  Clock: <ClockIcon className="w-5 h-5" />,
};

/**
 * Icon component map for when you need the raw component types
 * (useful for dynamic rendering with custom className)
 */
export const iconComponents = {
    Home: HomeIcon,
    ArrowLeft: ArrowLeftIcon,
    ArrowRight: ArrowRightIcon,
    ChevronDown: ChevronDownIcon,
    ChevronUp: ChevronUpIcon,
    ChevronLeft: ChevronLeftIcon,
    ChevronRight: ChevronRightIcon,
    Plus: PlusIcon,
    XMark: XMarkIcon,
    Check: CheckIcon,
    MagnifyingGlass: MagnifyingGlassIcon,
    Pencil: PencilIcon,
    Trash: TrashIcon,
    ArrowPath: ArrowPathIcon,
    InformationCircle: InformationCircleIcon,
    CheckCircle: CheckCircleIcon,
    ExclamationCircle: ExclamationCircleIcon,
    ExclamationTriangle: ExclamationTriangleIcon,
    XCircle: XCircleIcon,
    Envelope: EnvelopeIcon,
    Bell: BellIcon,
    ChatBubbleLeft: ChatBubbleLeftIcon,
    Cog6Tooth: Cog6ToothIcon,
    User: UserIcon,
    Document: DocumentIcon,
    Folder: FolderIcon,
    Calendar: CalendarIcon,
    Clock: ClockIcon,
};

/**
 * Helper function to generate standardized ArgTypes for icon props in Storybook.
 * This allows for consistent dropdown selection across all component stories.
 * 
 * @param propName - The name of the icon prop (default: 'icon')
 * @param description - Optional custom description for the control
 * @returns ArgType configuration object
 * 
 * @example
 * ```tsx
 * argTypes: {
 *   ...getIconArgTypes('leftIcon', 'Icon to display on the left side'),
 *   ...getIconArgTypes('rightIcon', 'Icon to display on the right side'),
 * }
 * ```
 */
export function getIconArgTypes(
    propName: string = 'icon',
    description: string = 'Icon to display'
) {
    const iconOptions = Object.keys(iconMap);

    return {
        [propName]: {
            control: { type: 'select' },
            options: iconOptions,
            mapping: iconMap,
            description,
            table: {
                type: { summary: 'React.ReactNode' },
                defaultValue: { summary: 'None' },
            },
        },
    };
}

/**
 * Get a list of all available icon names (excluding 'None')
 */
export function getAvailableIcons(): string[] {
    return Object.keys(iconMap).filter(key => key !== 'None');
}

/**
 * Get the icon component by name
 */
export function getIconByName(name: string | null | undefined): React.ReactNode {
    if (!name || name === 'None') return null;
    return iconMap[name] || null;
}
