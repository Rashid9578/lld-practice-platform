require('dotenv').config();
const connectDB = require('./config/db');
const Problem = require('./models/Problem');

const problems = [
  {
    title: 'Parking Lot System',
    slug: 'parking-lot',
    difficulty: 'Medium',
    description:
      'Design a parking lot system that supports multiple vehicle types (car, bike, truck) and multiple parking spot sizes.',
    requirements: [
      'Support different vehicle types and spot sizes',
      'Assign the nearest available compatible spot',
      'Track occupied vs free spots',
      'Calculate parking fee based on duration',
      'Should be extensible to add new vehicle types later'
    ]
  },
  {
    title: 'Elevator System',
    slug: 'elevator-system',
    difficulty: 'Hard',
    description:
      'Design an elevator control system for a building with multiple elevators and floors.',
    requirements: [
      'Handle multiple elevators serving multiple floors',
      'Efficiently assign the best elevator to a request',
      'Support up/down requests from floors and inside the elevator',
      'Handle concurrent requests gracefully',
      'Should be extensible to add scheduling strategies later'
    ]
  },
  {
    title: 'Library Management System',
    slug: 'library-management',
    difficulty: 'Easy',
    description:
      'Design a system to manage books, members, and borrowing/returning in a library.',
    requirements: [
      'Track book inventory and availability',
      'Allow members to borrow and return books',
      'Enforce borrowing limits and due dates',
      'Support searching books by title/author',
      'Should be extensible to add fines or reservations later'
    ]
  }
];

async function seed() {
  await connectDB();
  await Problem.deleteMany({});
  await Problem.insertMany(problems);
  console.log(`Seeded ${problems.length} problems.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
