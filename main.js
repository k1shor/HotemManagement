class Booking {
  constructor(
    guestName,
    bookingDate,
    membershipStatus,
    frequencyOfStays,
    bookingValue,
    specialRequests,
    bookingId
  ) {
    this.guestName = guestName;
    this.bookingDate = bookingDate;
    this.membershipStatus = membershipStatus;
    this.frequencyOfStays = frequencyOfStays;
    this.bookingValue = bookingValue;
    this.specialRequests = specialRequests;
    this.bookingId = bookingId;
    this.priority = this.calculatePriority();
  }

  // Calculate priority based on defined criteria
  calculatePriority() {
    let priority = 0;

    // Membership status (lower value for higher tiers)
    const membershipPriority = {
      Platinum: 1,
      Gold: 2,
      Silver: 3,
      Regular: 4,
    };
    priority += membershipPriority[this.membershipStatus] || 5;

    // Frequency of stays (more frequent, higher priority)
    if (this.frequencyOfStays > 50) {
      priority += 1;
    } else if (this.frequencyOfStays > 20) {
      priority += 2;
    } else {
      priority += 3;
    }

    // Booking value (higher value, higher priority)
    if (this.bookingValue > 5000) {
      priority += 1;
    } else if (this.bookingValue > 1000) {
      priority += 2;
    } else {
      priority += 3;
    }

    // Special requests (priority based on specific needs)
    if (this.specialRequests) {
      priority -= 1; // Give a small boost for special requests
    }

    return priority;
  }
}

module.exports = Booking;
f;
