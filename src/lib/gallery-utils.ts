import { Photo } from './mock-photo-data';

export interface FilterOptions {
  tags?: string[];
  searchQuery?: string;
  minLikes?: number;
  photographer?: string;
}

export type SortField = 'likes' | 'views' | 'downloads' | 'dateTaken' | 'title';
export type SortDirection = 'asc' | 'desc';

export interface PaginationResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export interface GalleryStats {
  totalPhotos: number;
  totalLikes: number;
  totalDownloads: number;
  totalViews: number;
  mostPopularTag: string | null;
  topPhotographer: string | null;
}

/**
  * Filters an array of photos based on provided criteria.
 */
export function filterPhotos(photos: Photo[] | null | undefined, options: FilterOptions = {}): Photo[] {
  if (!photos || !Array.isArray(photos)) {
    return [];
  }

  const { tags = [], searchQuery = "", minLikes = 0, photographer } = options;
  const cleanQuery = searchQuery.trim().toLowerCase();
  const cleanTags = tags.map(t => t.toLowerCase());

  return photos.filter(photo => {
    if (!photo) return false;

    // Minimum likes check
    if (minLikes > 0 && (photo.likes ?? 0) < minLikes) {
      return false;
    }

    // Specific photographer check
    if (photographer && photo.photographer?.toLowerCase() !== photographer.toLowerCase()) {
      return false;
    }

    // Filter by tags (matches if photo contains any of the selected tags)
    if (cleanTags.length > 0) {
      const photoTags = photo.tags ? photo.tags.map(t => t.toLowerCase()) : [];
      const matchesTag = cleanTags.some(tag => photoTags.includes(tag));
      if (!matchesTag) return false;
    }

    // Filter by search query (title, tags, photographer)
    if (cleanQuery !== "") {
      const titleMatch = photo.title?.toLowerCase().includes(cleanQuery) ?? false;
      const tagMatch = photo.tags?.some(tag => tag.toLowerCase().includes(cleanQuery)) ?? false;
      const photographerMatch = photo.photographer?.toLowerCase().includes(cleanQuery) ?? false;

      if (!titleMatch && !tagMatch && !photographerMatch) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sorts an array of photos by specified field and direction.
 */
export function sortPhotos(
  photos: Photo[] | null | undefined,
  sortBy: SortField = 'likes',
  direction: SortDirection = 'desc'
): Photo[] {
  if (!photos || !Array.isArray(photos)) {
    return [];
  }

  const sorted = [...photos];
  const multiplier = direction === 'asc' ? 1 : -1;

  return sorted.sort((a, b) => {
    if (!a && !b) return 0;
    if (!a) return 1;
    if (!b) return -1;

    let valA = a[sortBy];
    let valB = b[sortBy];

    if (valA === undefined || valA === null) return 1;
    if (valB === undefined || valB === null) return -1;

    if (typeof valA === 'string' && typeof valB === 'string') {
      return valA.localeCompare(valB) * multiplier;
    }

    if (valA < valB) return -1 * multiplier;
    if (valA > valB) return 1 * multiplier;
    return 0;
  });
}

/**
 * Paginates an array of items with boundary safety.
 */
export function paginatePhotos<T>(
  items: T[] | null | undefined,
  page: number = 1,
  perPage: number = 6
): PaginationResult<T> {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return {
      items: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: page,
      hasMore: false,
    };
  }

  const validPerPage = Math.max(1, perPage);
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / validPerPage);
  const validPage = Math.max(1, Math.min(page, totalPages));

  if (page < 1 || page > totalPages) {
    return {
      items: [],
      totalItems,
      totalPages,
      currentPage: page,
      hasMore: false,
    };
  }

  const startIndex = (validPage - 1) * validPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + validPerPage);
  const hasMore = validPage < totalPages;

  return {
    items: paginatedItems,
    totalItems,
    totalPages,
    currentPage: validPage,
    hasMore,
  };
}

/**
 * Computes aggregated statistics for a collection of photos.
 */
export function calculateGalleryStats(photos: Photo[] | null | undefined): GalleryStats {
  if (!photos || !Array.isArray(photos) || photos.length === 0) {
    return {
      totalPhotos: 0,
      totalLikes: 0,
      totalDownloads: 0,
      totalViews: 0,
      mostPopularTag: null,
      topPhotographer: null,
    };
  }

  let totalLikes = 0;
  let totalDownloads = 0;
  let totalViews = 0;
  const tagCounts: Record<string, number> = {};
  const photographerLikes: Record<string, number> = {};

  photos.forEach(photo => {
    if (!photo) return;

    totalLikes += photo.likes ?? 0;
    totalDownloads += photo.downloads ?? 0;
    totalViews += photo.views ?? 0;

    if (photo.tags && Array.isArray(photo.tags)) {
      photo.tags.forEach(tag => {
        const cleanTag = tag.toLowerCase().trim();
        tagCounts[cleanTag] = (tagCounts[cleanTag] || 0) + 1;
      });
    }

    if (photo.photographer) {
      const name = photo.photographer.trim();
      photographerLikes[name] = (photographerLikes[name] || 0) + (photo.likes ?? 0);
    }
  });

  let mostPopularTag: string | null = null;
  let maxTagCount = 0;
  Object.entries(tagCounts).forEach(([tag, count]) => {
    if (count > maxTagCount) {
      maxTagCount = count;
      mostPopularTag = tag;
    }
  });

  let topPhotographer: string | null = null;
  let maxLikes = -1;
  Object.entries(photographerLikes).forEach(([photographer, likes]) => {
    if (likes > maxLikes) {
      maxLikes = likes;
      topPhotographer = photographer;
    }
  });

  return {
    totalPhotos: photos.length,
    totalLikes,
    totalDownloads,
    totalViews,
    mostPopularTag,
    topPhotographer,
  };
}
