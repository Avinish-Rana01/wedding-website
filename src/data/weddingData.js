/**
 * weddingData.js — Single Source of Truth for Wedding Content
 * Follows WEDDING_CONTENT.md and AGENTS.md rules.
 * All unconfirmed fields strictly use '__' or are cleanly hidden from display.
 */

export const weddingData = {
  couple: {
    bride: {
      firstName: "Prachi",
      lastName: "__",
      parents: "__",
    },
    groom: {
      firstName: "Sumit",
      lastName: "__",
      parents: "__",
    },
    monogram: "P & S",
    hashtag: "#PrachiWedsSumit",
  },
  general: {
    heading: "WEDDING INVITATION",
    showInvocation: true,
    invocation: "॥ श्री गणेशाय नमः ॥",
    invocationSub: "Om Shri Ganeshaya Namah",
    invitationGreeting: "Together with their families",
    invitationPlea: "Request the honour of your presence and blessings to celebrate the wedding festivities of",
    tagline: "Celebrating Love, Tradition & Auspicious Beginnings",
    instructionOpen: "An Invitation for You",
    instructionTap: "Tap to Open",
    instructionReplay: "Fold & Close Invitation",
  },
  events: [
    {
      id: "haldi",
      title: "Haldi Ceremony",
      tagline: "A morning of turmeric, sunshine, and blessings",
      date: "__",
      time: "__",
      venue: "__",
      address: "__",
    },
    {
      id: "mehendi",
      title: "Mehendi Ceremony",
      tagline: "Intricate henna, lively songs, and festive cheer",
      date: "__",
      time: "__",
      venue: "__",
      address: "__",
    },
    {
      id: "sangeet",
      title: "Sangeet Night",
      tagline: "An evening of music, dance, and celebration",
      date: "__",
      time: "__",
      venue: "__",
      address: "__",
    },
    {
      id: "wedding",
      title: "Wedding Ceremony",
      tagline: "The sacred vows and the holy pheras",
      date: "__",
      time: "__",
      venue: "__",
      address: "__",
    },
    {
      id: "reception",
      title: "Grand Reception",
      tagline: "An evening of dinner, toasts, and congratulations",
      date: "__",
      time: "__",
      venue: "__",
      address: "__",
    },
  ],
  rsvp: {
    note: "Please kindly confirm your presence by __",
    contactPerson: "__",
    phone: "__",
    whatsappNumber: "__",
  },
}
