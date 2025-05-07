/**
 * Formats a Date object to a readable string
 * @param date The date to format
 * @returns Formatted date string (e.g., "August 10, 2023 10:45 AM")
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

/**
 * Formats a date to a relative time string (e.g., "2 hours ago")
 * @param date The date to format
 * @returns Relative time string
 */
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Less than a minute
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
  
  // Less than a month
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  
  // Less than a year
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
  
  // More than a year
  const years = Math.floor(diffInSeconds / 31536000);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

/**
 * Calculate the color for a trust score
 * @param score Trust score (0-100)
 * @returns CSS color class
 */
export function getTrustScoreColor(score: number): string {
  if (score >= 80) return 'bg-success';
  if (score >= 40) return 'bg-warning';
  return 'bg-danger';
}

/**
 * Get the status text based on trust score
 * @param score Trust score (0-100)
 * @returns Status text ("safe", "suspicious", or "dangerous")
 */
export function getTrustScoreStatus(score: number): "safe" | "suspicious" | "dangerous" {
  if (score >= 80) return 'safe';
  if (score >= 40) return 'suspicious';
  return 'dangerous';
}

/**
 * Get a clean version of a URL (e.g., remove protocol, www)
 * @param url The URL to clean
 * @returns Cleaned URL
 */
export function cleanUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '');
}
