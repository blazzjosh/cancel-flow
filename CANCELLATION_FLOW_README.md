# Complete Subscription Cancellation Flow Documentation

## Overview
This document describes the complete subscription cancellation flow implementation for Migrate Mate, including all screens, navigation paths, and technical details.

## Complete Flow Structure

### Flow Steps Overview
```
Initial Question → Job Found Path OR Downsell Path → Various Outcomes
```

### Detailed Flow Map

#### 1. **Initial Question Screen** (`initial`)
- **Purpose**: First step asking if user found a job
- **Question**: "Have you found a job yet?"
- **Options**: 
  - "Yes, I've found a job" → Goes to Congrats Screen
  - "Not yet - I'm still looking" → Goes to Downsell Screen
- **Navigation**: No back button (first step)

#### 2A. **Job Found Path** (If user found a job)

##### 2A.1. **Congrats Screen** (`congrats`)
- **Purpose**: Survey form for users who found jobs
- **Progress**: Step 1 of 3
- **Survey Questions**:
  - Did you find this job with MigrateMate? (Yes/No)
  - How many roles did you apply for through Migrate Mate? (0, 1-5, 6-20, 20+)
  - How many companies did you email directly? (0, 1-5, 6-20, 20+)
  - How many different companies did you interview with? (0, 1-2, 3-5, 5+)
- **Continue Button**: Enabled only when all questions are answered
- **Navigation**: Back to Initial Question

##### 2A.2. **Post-Survey Paths** (After survey completion)

###### 2A.2.1. **Yes With MM Screen** (`yesWithMM`)
- **Purpose**: For users who found jobs WITH MigrateMate
- **Options**:
  - "Complete cancellation" → Closes flow
  - "No help with visa" → Goes to No Help With Visa Screen
  - "Visa help" → Goes to Visa Help Screen
- **Navigation**: Back to Congrats Screen

###### 2A.2.2. **Feedback Screen** (`feedback`)
- **Purpose**: Collect additional feedback
- **Input**: Text area for feedback
- **Continue Button**: Saves feedback and goes to No Without MM Screen
- **Navigation**: Back to Congrats Screen

###### 2A.2.3. **No Without MM Screen** (`noWithoutMM`)
- **Purpose**: For users who found jobs WITHOUT MigrateMate
- **Options**:
  - "Complete cancellation" → Closes flow
  - "No help with visa" → Goes to No Help With Visa Screen
  - "Visa help" → Goes to Visa Help Screen
- **Navigation**: Back to Feedback Screen

###### 2A.2.4. **No Help With Visa Screen** (`noHelpWithVisa`)
- **Purpose**: For users who don't need visa help
- **Action**: "Finish" button → Closes flow
- **Navigation**: Back to previous screen

###### 2A.2.5. **Visa Help Screen** (`visaHelp`)
- **Purpose**: For users who need visa assistance
- **Action**: "Finish" button → Closes flow
- **Navigation**: Back to previous screen

#### 2B. **Downsell Path** (If user hasn't found a job)

##### 2B.1. **Downsell Screen** (`downsell`)
- **Purpose**: A/B testing offer for users still looking
- **Progress**: Step 2 of 3
- **A/B Variants**:
  - **Variant A**: 50% off ($19.50/month instead of $39/month)
  - **Variant B**: 50% off ($12.50/month instead of $25/month)
- **Options**:
  - "Get discount" → Goes to Offer Accept 1 Screen
  - "No thanks" → Goes to Offer Declined Screen
- **Navigation**: Back to Initial Question

##### 2B.2. **Offer Accept 1 Screen** (`offerAccept1`)
- **Purpose**: Confirmation of discount acceptance
- **Message**: "Great choice, mate! You're still on the path to your dream role."
- **Details**: Shows remaining days and new discounted price
- **Action**: "Land your dream role" button → Closes flow
- **Navigation**: Back to Downsell Screen

##### 2B.3. **Offer Declined Screen** (`offerDeclined`)
- **Purpose**: Survey for users who declined the discount
- **Progress**: Step 3 of 3
- **Survey Questions**:
  - How many roles did you apply for through Migrate Mate? (0, 1-5, 6-20, 20+)
  - How many companies did you email directly? (0, 1-5, 6-20, 20+)
  - How many different companies did you interview with? (0, 1-2, 3-5, 5+)
- **Options**:
  - "Get 50% off" → Goes to Offer Accept 1 Screen
  - "Continue" → Goes to Cancel Reason Screen
- **Navigation**: Back to Downsell Screen

##### 2B.4. **Cancel Reason Screen** (`cancelReason`)
- **Purpose**: Collect cancellation reason and details
- **Progress**: Step 3 of 3
- **Reason Options**:
  - Too expensive
  - Platform not helpful
  - Not enough relevant jobs
  - Decided not to move
  - Other
- **Follow-up Questions**: Conditional based on selected reason
- **Options**:
  - "Get 50% off" → Goes to Offer Accept 1 Screen
  - "Complete cancellation" → Goes to Cancel Complete Screen
- **Navigation**: Back to Offer Declined Screen

##### 2B.5. **Cancel Complete Screen** (`cancelComplete`)
- **Purpose**: Final confirmation of cancellation
- **Message**: "Sorry to see you go, mate. Thanks for being with us, and you're always welcome back."
- **Details**: Shows subscription end date and access information
- **Action**: "Back to Jobs" button → Closes flow
- **Navigation**: Back to Cancel Reason Screen

## Technical Implementation

### Component Structure
```
src/components/
├── CancellationFlow.tsx          # Main flow controller
└── screens/
    ├── index.ts                  # Export all components
    ├── types.ts                  # Shared types and interfaces
    ├── job-found/                # Job found path screens
    │   ├── index.ts
    │   ├── InitialQuestionScreen.tsx
    │   ├── CongratsScreen.tsx
    │   ├── YesWithMMScreen.tsx
    │   ├── NoHelpWithVisaScreen.tsx
    │   ├── FeedbackScreen.tsx
    │   ├── NoWithoutMMScreen.tsx
    │   └── VisaHelp.tsx
    └── downsell/                 # Downsell path screens
        ├── index.ts
        ├── DownsellScreen.tsx
        ├── OfferAccept1.tsx
        ├── OfferDeclined.tsx
        ├── CancelReason.tsx
        └── cancelComplete.tsx
```

### State Management
- **Flow Step**: Tracks current screen using `FlowStep` type
- **A/B Testing**: Deterministic variant assignment based on user ID hash
- **Form Data**: Manages survey answers and user inputs
- **Navigation**: Handles back button logic and screen transitions

### Key Types
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

type DownsellVariant = 'A' | 'B';

interface SurveyAnswers {
  foundJobWithMigrateMate: string;
  rolesApplied: string;
  companiesEmailed: string;
  companiesInterviewed: string;
}
```

### Database Integration
- **Supabase Client**: Handles all database operations
- **Cancellations Table**: Stores flow data, A/B variants, and user responses
- **Row-Level Security**: Ensures users can only access their own data
- **Data Persistence**: Saves all user interactions and decisions

### A/B Testing Implementation
- **Deterministic Assignment**: User ID hash determines variant (A or B)
- **Persistent Variants**: Same user always gets same variant
- **Variant A**: 50% off ($19.50 instead of $39)
- **Variant B**: 50% off ($12.50 instead of $25)

### Navigation Logic
- **Back Button**: Context-aware navigation based on current step
- **Progress Indicator**: Shows current step and total steps
- **Form Validation**: Prevents progression until required fields are completed
- **Error Handling**: User-friendly error messages for validation failures

## Usage Examples

### Starting the Flow
```typescript
<CancellationFlow
  isOpen={showCancellationFlow}
  onClose={() => setShowCancellationFlow(false)}
  subscriptionId="sub_123"
  userId="user_456"
/>
```

### Handling Screen Navigation
```typescript
const handleJobFoundAnswer = (answer: JobFoundAnswer) => {
  if (answer === 'yes') {
    setCurrentStep('congrats');
  } else {
    setCurrentStep('downsell');
  }
};
```

## Future Enhancements

1. **Analytics Tracking**: Monitor A/B testing performance and user behavior
2. **Animation Transitions**: Smooth transitions between screens
3. **Personalization**: Dynamic content based on user history
4. **Multi-language Support**: Internationalization for global users
5. **Advanced A/B Testing**: Statistical significance testing and optimization

## Security Considerations

- **Input Validation**: All user inputs are validated before processing
- **Row-Level Security**: Database policies ensure data isolation
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Secure form handling and state management
- **Data Encryption**: Sensitive data encrypted in transit and at rest
