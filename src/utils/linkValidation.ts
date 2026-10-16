/**
 * Link Validation Utilities
 * Ensures links are safe and appropriate for the website
 */

/**
 * Validate a URL or link
 * Returns true if the link is safe, false otherwise
 */
export function isValidLink(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const trimmedUrl = url.trim();

  // Allow empty strings (optional links)
  if (trimmedUrl === '') {
    return true;
  }

  // Allow internal routes (starting with /)
  if (trimmedUrl.startsWith('/')) {
    return true;
  }

  // Allow tel: links
  if (trimmedUrl.startsWith('tel:')) {
    return /^tel:[\d+\-\s()]+$/.test(trimmedUrl);
  }

  // Allow mailto: links
  if (trimmedUrl.startsWith('mailto:')) {
    return /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedUrl);
  }

  // Allow http and https URLs
  if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
    try {
      new URL(trimmedUrl);
      return true;
    } catch {
      return false;
    }
  }

  // Reject everything else (including javascript:, data:, etc.)
  return false;
}

/**
 * Validate and sanitize a URL
 * Returns the URL if valid, empty string if invalid
 */
export function sanitizeLink(url: string): string {
  return isValidLink(url) ? url.trim() : '';
}

/**
 * Check if a link is external
 */
export function isExternalLink(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const trimmedUrl = url.trim();
  return trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://');
}

/**
 * Check if a link is internal
 */
export function isInternalLink(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const trimmedUrl = url.trim();
  return trimmedUrl.startsWith('/');
}

/**
 * Check if a link is a phone number
 */
export function isPhoneLink(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  return url.trim().startsWith('tel:');
}

/**
 * Check if a link is an email
 */
export function isEmailLink(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  return url.trim().startsWith('mailto:');
}

/**
 * Get link target attribute
 * Returns '_blank' for external links, undefined for internal links
 */
export function getLinkTarget(url: string): string | undefined {
  return isExternalLink(url) ? '_blank' : undefined;
}

/**
 * Get link rel attribute
 * Returns 'noopener noreferrer' for external links, undefined for internal links
 */
export function getLinkRel(url: string): string | undefined {
  return isExternalLink(url) ? 'noopener noreferrer' : undefined;
}
