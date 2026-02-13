# Hierarchical Allocation Table – ReactJS

## Overview

This project is a ReactJS application that implements a hierarchical table with dynamic value updates and parent-child relationships.

The application supports real-time calculations, hierarchical updates, and persistent state management.

## Features

1. Hierarchical Structure
- Supports multiple levels of nested rows
- Parent values are automatically calculated from child rows
- Grand total updates dynamically

2. Allocation %
- Enter a percentage value
- Clicking "Allocation %" increases the row's value by the given percentage
- Subtotals and grand totals update automatically

3. Allocation Val
- Enter a numeric value
- Clicking "Allocation Val" directly updates the row's value
- If applied to a parent row, values are proportionally distributed to its leaf nodes

4. Variance %
- Displays variance compared to the original value
- Formula used:

  Variance % = ((Current Value - Original Value) / Original Value) * 100

5. State Persistence
- Data is stored in localStorage
- Changes remain even after page refresh

## Tech Stack

- ReactJS (Functional Components)
- React Hooks (useState, useEffect)
- JavaScript (ES6)
- Basic CSS

## Setup Instructions

1. Install dependencies:
   npm install

2. Start the application:
   npm start

The app runs at:
http://localhost:3000

## Implementation Notes

- State is managed using React Hooks
- Updates are handled immutably
- Recursive logic is used for hierarchical updates
- Parent totals are recalculated automatically after each update
- Edge cases such as invalid inputs are handled gracefully

## Submission

Public GitHub repository link shared as requested.
