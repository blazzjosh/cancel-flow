# Subscription Cancellation Flow Implementation

## Overview
This implementation provides a complete subscription cancellation flow with A/B testing capabilities, matching the design requirements from the provided screenshots.

## Features

### Step 1 - Initial Question
- Modal with "Subscription Cancellation" header and X close button
- Main content: "Hey mate, Quick one before you go."
- Question: "Have you found a job yet?" (italic styling)
- Subtitle explaining the purpose
- Two action buttons: "Yes, I've found a job" and "Not yet - I'm still looking"
- NYC skyline image on the right side
- Gray overlay background

### Step 2A - Congrats Screen (If "Yes")
- Back button and progress indicator "Step 1 of 3"
- Header: "Congrats on the new role! 🎉"
- Survey questions with radio button options:
  - Did you find this job with MigrateMate? (Yes/No)
  - How many roles did you apply for through Migrate Mate? (0, 1-5, 6-20, 20+)
  - How many companies did you email directly? (0, 1-5, 6-20, 20+)
  - How many different companies did you interview with? (0, 1-2, 3-5, 5+)
- Continue button (disabled until all questions are answered)
- Same NYC skyline image on the right

### Step 2B - Downsell Screen (If "No")
- A/B testing implementation with two variants:
  - Variant A: 50% off ($12.50/month instead of $25/month)
  - Variant B: $10 off ($15/month instead of $25/month)
- Downsell offer with pricing details
- "Get discount" button and "No thanks" option
- Disclaimer about billing
- Same NYC skyline image on the right

## Technical Implementation

### Components
- `CancellationFlow.tsx` - Main modal component handling all three steps
- Integrated into the existing profile page via the "Cancel Migrate Mate" button

### State Management
- React hooks for managing flow state, form data, and A/B testing variants
- Form validation to ensure all survey questions are answered before proceeding
- Persistent A/B testing assignment based on user ID hash

### A/B Testing Logic
- Variant assignment happens on first flow entry
- Uses user ID hash to deterministically assign variant A or B
- Variant is persisted to the `cancellations.downsell_variant` field
- Different pricing and messaging based on assigned variant

### Database Integration
- Survey answers are saved to the `cancellations` table
- Downsell acceptance/rejection is tracked
- Uses Supabase client for database operations

### Styling
- Tailwind CSS for responsive design
- Clean, modern UI with rounded corners and proper spacing
- NYC skyline SVG image on the right side of all steps
- Progress indicators and navigation elements

## Usage

1. **Entry Point**: Click "Cancel Migrate Mate" button in the subscription management section
2. **Flow Navigation**: Use back buttons to navigate between steps
3. **Form Completion**: All survey questions must be answered to proceed
4. **A/B Testing**: Variant is automatically assigned and consistent for each user
5. **Data Persistence**: All responses and decisions are saved to the database

## Files Modified/Created

- `src/components/CancellationFlow.tsx` - New component
- `src/app/page.tsx` - Updated to integrate cancellation flow
- `public/nyc-skyline.svg` - NYC skyline image asset
- `src/lib/supabase.ts` - Updated to handle missing environment variables

## Database Schema

The implementation uses the existing database schema from `seed.sql`:
- `users` table for user identification
- `subscriptions` table for subscription details
- `cancellations` table for tracking cancellation flow data and A/B testing variants

## Responsive Design

The modal is designed to work on both desktop and mobile devices:
- Responsive layout that adapts to different screen sizes
- Touch-friendly button sizes and spacing
- Proper modal sizing and scrolling for smaller screens

## Future Enhancements

- Add analytics tracking for A/B testing results
- Implement more sophisticated variant assignment algorithms
- Add additional survey questions or flow steps
- Integrate with actual payment processing for downsell offers
