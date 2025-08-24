# Complete Cancellation Flow Screens

This folder contains all the individual screen components for the subscription cancellation flow, making the code more maintainable and easier to edit.

## Complete Structure

```
screens/
├── index.ts              # Export all components and types
├── types.ts              # Shared TypeScript interfaces and types
├── job-found/            # Screens for users who found jobs
│   ├── index.ts          # Export job-found screens
│   ├── InitialQuestionScreen.tsx    # Step 1: Initial job status question
│   ├── CongratsScreen.tsx           # Step 2A: Survey for users who found jobs
│   ├── YesWithMMScreen.tsx          # Step 3A: For users who found jobs WITH MigrateMate
│   ├── NoHelpWithVisaScreen.tsx     # Step 4A: Users who don't need visa help
│   ├── FeedbackScreen.tsx            # Step 3B: Collect additional feedback
│   ├── NoWithoutMMScreen.tsx        # Step 4B: For users who found jobs WITHOUT MigrateMate
│   └── VisaHelp.tsx                 # Step 5: Users who need visa assistance
└── downsell/             # Screens for downsell offer flow
    ├── index.ts          # Export downsell screens
    ├── DownsellScreen.tsx           # Step 2B: A/B testing offer for users still looking
    ├── OfferAccept1.tsx             # Step 3C: Confirmation of discount acceptance
    ├── OfferDeclined.tsx            # Step 3D: Survey for users who declined discount
    ├── CancelReason.tsx             # Step 4: Collect cancellation reason and details
    └── cancelComplete.tsx           # Step 5: Final cancellation confirmation
```

## Screen Components

### Job Found Path Screens

#### InitialQuestionScreen
- **Purpose**: First step of the cancellation flow
- **Props**: `onJobFoundAnswer: (answer: 'yes' | 'no') => void`
- **Features**: 
  - Welcoming message with "Hey mate, Quick one before you go"
  - Main question: "Have you found a job yet?" (italic styling)
  - Two action buttons with proper radio button semantics
  - Uses the exact design styling from the provided mockup

#### CongratsScreen
- **Purpose**: Survey form for users who found jobs
- **Props**: 
  - `surveyAnswers: SurveyAnswers`
  - `onSurveyAnswerChange: (question, value) => void`
  - `onContinue: () => void`
  - `isFormValid: boolean`
- **Features**:
  - 4 survey questions with radio button options
  - Form validation to ensure all questions are answered
  - Continue button (disabled until form is complete)
  - Consistent button styling with the main app theme

#### YesWithMMScreen
- **Purpose**: For users who found jobs WITH MigrateMate
- **Props**:
  - `onCompleteCancellation: () => void`
  - `onNavigateToNoHelpWithVisa: () => void`
  - `onNavigateToVisaHelp: () => void`
- **Features**:
  - Options to complete cancellation or get additional help
  - Navigation to visa-related assistance screens

#### NoHelpWithVisaScreen
- **Purpose**: For users who don't need visa help
- **Props**:
  - `onFinish: () => void`
- **Features**:
  - Simple confirmation screen
  - Finish button to close the flow

#### FeedbackScreen
- **Purpose**: Collect additional feedback from users
- **Props**:
  - `onContinue: (feedback: string) => void`
- **Features**:
  - Text area for user feedback
  - Continue button to proceed to next screen

#### NoWithoutMMScreen
- **Purpose**: For users who found jobs WITHOUT MigrateMate
- **Props**:
  - `onCompleteCancellation: () => void`
  - `onNavigateToNoHelpWithVisa: () => void`
  - `onNavigateToVisaHelp: () => void`
- **Features**:
  - Options to complete cancellation or get additional help
  - Navigation to visa-related assistance screens

#### VisaHelp
- **Purpose**: For users who need visa assistance
- **Props**:
  - `onFinish: () => void`
- **Features**:
  - Information about visa assistance
  - Finish button to close the flow

### Downsell Path Screens

#### DownsellScreen
- **Purpose**: A/B testing offer for users still looking for jobs
- **Props**:
  - `variant: DownsellVariant`
  - `onNavigateToOfferAccept1: () => void`
  - `onNavigateToOfferDeclined: () => void`
- **Features**:
  - Different pricing based on A/B testing variant
  - Variant A: 50% off ($19.50/month instead of $39/month)
  - Variant B: 50% off ($12.50/month instead of $25/month)
  - Accept/Reject buttons with proper styling

#### OfferAccept1
- **Purpose**: Confirmation of discount acceptance
- **Props**:
  - `variant: DownsellVariant`
  - `daysLeft?: number`
  - `nextBillingDate?: string`
  - `onComplete: () => void`
- **Features**:
  - Success message: "Great choice, mate!"
  - Shows remaining days on current plan
  - Displays new discounted price
  - "Land your dream role" button to complete

#### OfferDeclined
- **Purpose**: Survey for users who declined the discount
- **Props**:
  - `variant: DownsellVariant`
  - `onGetDiscount: () => void`
  - `onNavigateToCancelReason: () => void`
- **Features**:
  - Survey questions about job search activity
  - Option to reconsider and get discount
  - Continue button to proceed to cancellation reason

#### CancelReason
- **Purpose**: Collect cancellation reason and details
- **Props**:
  - `variant: DownsellVariant`
  - `onGetDiscount: (reason: string, details?: string) => void`
  - `onCompleteCancellation: (reason: string, details?: string) => void`
- **Features**:
  - Multiple reason options with radio buttons
  - Conditional follow-up questions based on selection
  - Form validation for required fields
  - Options to get discount or complete cancellation

#### CancelComplete
- **Purpose**: Final confirmation of cancellation
- **Props**:
  - `endDate?: string`
  - `onBackToJobs: () => void`
- **Features**:
  - Farewell message: "Sorry to see you go, mate"
  - Subscription end date information
  - Access details until end date
  - "Back to Jobs" button to close flow

## Types

### SurveyAnswers
```typescript
interface SurveyAnswers {
  foundJobWithMigrateMate: string;
  rolesApplied: string;
  companiesEmailed: string;
  companiesInterviewed: string;
}
```

### FlowStep
```typescript
type FlowStep = 
  | 'initial' 
  | 'congrats' 
  | 'yesWithMM' 
  | 'noHelpWithVisa' 
  | 'feedback' 
  | 'noWithoutMM' 
  | 'visaHelp' 
  | 'downsell' 
  | 'offerAccept1' 
  | 'offerDeclined' 
  | 'cancelReason' 
  | 'cancelComplete';
```

### DownsellVariant
```typescript
type DownsellVariant = 'A' | 'B';
```

## Benefits of This Structure

1. **Maintainability**: Each screen is a separate component, making it easier to modify individual steps
2. **Reusability**: Components can be reused or modified independently
3. **Testing**: Each screen can be tested in isolation
4. **Code Organization**: Clear separation of concerns with logical grouping
5. **Type Safety**: Shared types ensure consistency across components
6. **Easier Editing**: Developers can focus on one screen at a time
7. **Logical Flow**: Screens are grouped by user journey (job-found vs downsell)

## Logical Grouping

### Job Found Flow (`job-found/`)
- **InitialQuestionScreen**: First step asking if user found a job
- **CongratsScreen**: Survey form for users who found jobs
- **YesWithMMScreen**: For users who found jobs WITH MigrateMate
- **NoHelpWithVisaScreen**: Users who don't need visa help
- **FeedbackScreen**: Collect additional feedback
- **NoWithoutMMScreen**: For users who found jobs WITHOUT MigrateMate
- **VisaHelp**: Users who need visa assistance

### Downsell Flow (`downsell/`)
- **DownsellScreen**: A/B testing offer for users still looking
- **OfferAccept1**: Confirmation of discount acceptance
- **OfferDeclined**: Survey for users who declined discount
- **CancelReason**: Collect cancellation reason and details
- **CancelComplete**: Final cancellation confirmation

## Usage

```typescript
import { 
  InitialQuestionScreen, 
  CongratsScreen, 
  DownsellScreen,
  OfferAccept1,
  CancelReason,
  CancelComplete
} from '@/components/screens';

// Use in your main component
{currentStep === 'initial' && (
  <InitialQuestionScreen onJobFoundAnswer={handleJobFoundAnswer} />
)}
```

## Future Enhancements

- Add individual screen tests
- Create screen-specific styling files
- Add animation transitions between screens
- Implement screen-specific analytics tracking
- Add accessibility improvements
- Create screen-specific error boundaries
