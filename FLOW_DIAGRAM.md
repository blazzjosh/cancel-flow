# Cancellation Flow Visual Diagram

## Complete Flow Map

```
                                    ┌─────────────────┐
                                    │   Initial       │
                                    │   Question      │
                                    │                 │
                                    │ "Have you found │
                                    │  a job yet?"    │
                                    └─────────┬───────┘
                                              │
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                         │                         │
                    ▼                         ▼                         │
        ┌─────────────────────┐    ┌─────────────────────┐             │
        │     Job Found       │    │     Downsell        │             │
        │       Path          │    │       Path          │             │
        │                     │    │                     │             │
        │  "Yes, I found a   │    │  "Not yet - still   │             │
        │       job"          │    │      looking"       │             │
        └─────────┬───────────┘    └─────────┬───────────┘             │
                  │                          │                         │
                  ▼                          ▼                         │
        ┌─────────────────────┐    ┌─────────────────────┐             │
        │     Congrats        │    │     Downsell        │             │
        │      Screen         │    │      Screen         │             │
        │   (Step 1 of 3)    │    │   (Step 2 of 3)    │             │
        │                     │    │                     │             │
        │  Survey Questions   │    │  A/B Testing Offer  │             │
        │                     │    │                     │             │
        └─────────┬───────────┘    └─────────┬───────────┘             │
                  │                          │                         │
                  ▼                          ▼                         │
        ┌─────────────────────┐    ┌─────────────────────┐             │
        │   Post-Survey       │    │   Offer Accept 1    │             │
        │      Paths          │    │      Screen         │             │
        │                     │    │                     │             │
        │  Multiple Options   │    │  "Great choice!"    │             │
        │  Based on Answers   │    │  Confirmation       │             │
        └─────────┬───────────┘    └─────────┬───────────┘             │
                  │                          │                         │
                  │                          │                         │
                  ▼                          │                         │
        ┌─────────────────────┐              │                         │
        │   Yes With MM       │              │                         │
        │      Screen         │              │                         │
        │                     │              │                         │
        │  Found job WITH     │              │                         │
        │  MigrateMate        │              │                         │
        └─────────┬───────────┘              │                         │
                  │                          │                         │
                  ▼                          │                         │
        ┌─────────────────────┐              │                         │
        │   No Help With      │              │                         │
        │      Visa           │              │                         │
        │                     │              │                         │
        │  Don't need visa    │              │                         │
        │     help            │              │                         │
        └─────────┬───────────┘              │                         │
                  │                          │                         │
                  ▼                          │                         │
        ┌─────────────────────┐              │                         │
        │     Visa Help       │              │                         │
        │      Screen         │              │                         │
        │                     │              │                         │
        │  Need visa          │              │                         │
        │   assistance        │              │                         │
        └─────────┬───────────┘              │                         │
                  │                          │                         │
                  │                          │                         │
                  ▼                          ▼                         │
        ┌─────────────────────┐    ┌─────────────────────┐             │
        │   Feedback          │    │   Offer Declined    │             │
        │      Screen         │    │      Screen         │             │
        │                     │    │   (Step 3 of 3)    │             │
        │  Additional         │    │                     │             │
        │   feedback          │    │  Survey for users   │             │
        │                     │    │  who declined       │             │
        └─────────┬───────────┘    └─────────┬───────────┘             │
                  │                          │                         │
                  ▼                          ▼                         │
        ┌─────────────────────┐    ┌─────────────────────┐             │
        │   No Without MM     │    │   Cancel Reason     │             │
        │      Screen         │    │      Screen         │             │
        │                     │    │   (Step 3 of 3)    │             │
        │  Found job WITHOUT  │    │                     │             │
        │  MigrateMate        │    │  Reason selection   │             │
        └─────────┬───────────┘    └─────────┬───────────┘             │
                  │                          │                         │
                  │                          ▼                         │
                  │              ┌─────────────────────┐               │
                  │              │   Cancel Complete   │               │
                  │              │      Screen         │               │
                  │              │                     │               │
                  │              │  Final confirmation │               │
                  │              │  "Sorry to see you  │               │
                  │              │       go"           │               │
                  │              └─────────┬───────────┘               │
                  │                        │                           │
                  │                        ▼                           │
                  │              ┌─────────────────────┐               │
                  │              │   Offer Accept 1    │               │
                  │              │      Screen         │               │
                  │              │                     │               │
                  │              │  "Get 50% off"      │               │
                  │              │  from Cancel Reason │               │
                  │              └─────────┬───────────┘               │
                  │                        │                           │
                  ▼                        ▼                           │
        ┌─────────────────────┐    ┌─────────────────────┐             │
        │      CLOSE          │    │      CLOSE          │             │
        │       FLOW          │    │       FLOW          │             │
        └─────────────────────┘    └─────────────────────┘             │
                                                                       │
                                                                       │
                                    ┌─────────────────────────────────┘
                                    │
                                    ▼
                            ┌─────────────────┐
                            │   Back Button   │
                            │   Navigation    │
                            │                 │
                            │  Context-aware  │
                            │  back paths     │
                            └─────────────────┘
```

## Navigation Paths Summary

### Job Found Path
1. **Initial Question** → **Congrats Screen** → **Post-Survey Options**
2. **Post-Survey Options**:
   - **Yes With MM** → **No Help With Visa** → **Visa Help** → Close Flow
   - **Feedback** → **No Without MM** → **No Help With Visa** → **Visa Help** → Close Flow

### Downsell Path
1. **Initial Question** → **Downsell Screen** → **Offer Options**
2. **Offer Options**:
   - **Accept Offer** → **Offer Accept 1** → Close Flow
   - **Decline Offer** → **Offer Declined** → **Cancel Reason** → **Cancel Complete** → Close Flow
   - **Get 50% off** (from Cancel Reason) → **Offer Accept 1** → Close Flow

### Key Features
- **Progress Indicators**: Shows current step (1 of 3, 2 of 3, 3 of 3, 4 of 4)
- **Back Navigation**: Context-aware back button for each screen
- **Form Validation**: Prevents progression until required fields are completed
- **A/B Testing**: Different pricing variants for downsell offers
- **Data Persistence**: All user interactions saved to database

### Screen States
- **Initial**: Entry point, no back button
- **Survey Screens**: Form validation required to proceed
- **Confirmation Screens**: Final actions before closing flow
- **Navigation Screens**: Multiple options for user to choose from
