import type { ProductInput } from '../types';

export interface SampleScenario {
  label: string;
  input: ProductInput;
}

export const sampleScenarios: SampleScenario[] = [
  {
    label: 'Wireless Earbuds',
    input: {
      historicalListings: [
        'Premium Wireless Earbuds with Noise Cancelling, 48H Playtime, Deep Bass, and Comfortable Fit for Workouts and Travel. Built for clear calls, stable connection, and everyday listening.',
        'Lightweight Bluetooth Earbuds for Running, IPX7 Water Resistant Sport Headphones with Secure Fit, Fast Charging Case, and Rich Stereo Sound for Gym and Commute.',
        'Compact Noise Cancelling Earbuds with Long Battery Life, Touch Controls, Low Latency Mode, and Soft Silicone Tips for Music, Calls, and Podcasts.',
      ],
      productName: 'AeroFit Wireless Earbuds',
      sellingPoints: 'long battery life, water resistant design, comfortable secure fit, clear calls, compact charging case',
      keywords: 'wireless earbuds, noise cancelling, running headphones, bluetooth earbuds',
      desiredTone: 'premium but practical',
    },
  },
  {
    label: 'Heated Lunch Box',
    input: {
      historicalListings: [
        'Portable Electric Lunch Box Food Heater with Stainless Steel Container, Leakproof Lid, and Easy-Carry Handle for Office, School, and Travel Meals.',
        'Compact Heated Lunch Container for Work with Removable Tray, Even Warming Design, and Simple Cleaning for Fresh Meals Away from Home.',
        'Travel Friendly Food Warmer Lunch Box with Secure Seal, Dual-Use Power Options, and Practical Storage for Commuters and Busy Parents.',
      ],
      productName: 'WarmMate Heated Lunch Box',
      sellingPoints: 'portable heating, leakproof lid, stainless steel tray, easy cleaning, office lunch friendly',
      keywords: 'heated lunch box, electric lunch box, food warmer, portable lunch container',
      desiredTone: 'warm, practical, trustworthy',
    },
  },
  {
    label: 'Travel Organizer',
    input: {
      historicalListings: [
        'Compression Packing Cubes for Travel with Lightweight Fabric, Smooth Zippers, and Space-Saving Organization for Carry-On Luggage.',
        'Travel Organizer Bags Set for Suitcases, Weekend Trips, and Family Vacations with Breathable Mesh Panels and Clear Category Sorting.',
        'Durable Packing Cubes for Clothes, Shoes, and Accessories, Designed to Keep Luggage Neat During Business Travel and Holidays.',
      ],
      productName: 'PackEase Compression Travel Organizer',
      sellingPoints: 'space saving compression, lightweight fabric, smooth zippers, breathable mesh, suitcase organization',
      keywords: 'packing cubes, travel organizer, compression packing cubes, suitcase organizer',
      desiredTone: 'clean, organized, travel-smart',
    },
  },
];

export const sampleProductInput: ProductInput = sampleScenarios[0].input;
