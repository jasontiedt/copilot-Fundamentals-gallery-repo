import {
    calculateGalleryStats,
    filterPhotos,
    paginatePhotos,
    sortPhotos,
} from './gallery-utils';
import { Photo, mockPhotos } from './mock-photo-data';

const makePhoto = (overrides: Partial<Photo> = {}): Photo => ({
  id: 'id',
  url: '/placeholder.jpg',
  title: 'Untitled',
  tags: [],
  likes: 0,
  downloads: 0,
  views: 0,
  ...overrides,
});

describe('filterPhotos', () => {
  const photos: Photo[] = [
    makePhoto({ id: '1', title: 'Sunset Landscape', tags: ['landscape', 'sunset'], likes: 120, photographer: 'John Doe' }),
    makePhoto({ id: '2', title: 'Portrait Study', tags: ['portrait', 'studio'], likes: 80, photographer: 'Jane Smith' }),
    makePhoto({ id: '3', title: 'City Nights', tags: ['city', 'night'], likes: 200, photographer: 'John Doe' }),
  ];

  it('returns an empty array for null, undefined, or non-array input', () => {
    expect(filterPhotos(null)).toEqual([]);
    expect(filterPhotos(undefined)).toEqual([]);
    expect(filterPhotos({} as unknown as Photo[])).toEqual([]);
  });

  it('returns every photo when no filters are provided', () => {
    expect(filterPhotos(photos)).toHaveLength(3);
  });

  it('filters by a minimum like count', () => {
    expect(filterPhotos(photos, { minLikes: 100 }).map(p => p.id)).toEqual(['1', '3']);
  });

  it('filters by photographer case-insensitively', () => {
    expect(filterPhotos(photos, { photographer: 'john doe' }).map(p => p.id)).toEqual(['1', '3']);
  });

  it('matches any of the provided tags, ignoring case', () => {
    expect(filterPhotos(photos, { tags: ['PORTRAIT'] }).map(p => p.id)).toEqual(['2']);
  });

  it('searches across title, tags, and photographer', () => {
    expect(filterPhotos(photos, { searchQuery: 'sunset' }).map(p => p.id)).toEqual(['1']);
    expect(filterPhotos(photos, { searchQuery: 'jane' }).map(p => p.id)).toEqual(['2']);
    expect(filterPhotos(photos, { searchQuery: 'night' }).map(p => p.id)).toEqual(['3']);
  });

  it('trims and lowercases the search query', () => {
    expect(filterPhotos(photos, { searchQuery: '  PORTRAIT  ' }).map(p => p.id)).toEqual(['2']);
  });

  it('returns no matches when the search query matches nothing', () => {
    expect(filterPhotos(photos, { searchQuery: 'nonexistent' })).toEqual([]);
  });

  it('applies multiple filters together', () => {
    expect(filterPhotos(photos, { photographer: 'John Doe', minLikes: 150 }).map(p => p.id)).toEqual(['3']);
  });

  it('skips null entries in the photos array', () => {
    const withNull = [makePhoto({ id: '1', likes: 100 }), null, makePhoto({ id: '2', likes: 100 })] as unknown as Photo[];
    expect(filterPhotos(withNull, { minLikes: 50 }).map(p => p.id)).toEqual(['1', '2']);
  });
});

describe('sortPhotos', () => {
  const photos: Photo[] = [
    makePhoto({ id: 'low', title: 'Beta', likes: 10 }),
    makePhoto({ id: 'high', title: 'Alpha', likes: 30 }),
    makePhoto({ id: 'mid', title: 'Gamma', likes: 20 }),
  ];

  it('returns an empty array for null, undefined, or non-array input', () => {
    expect(sortPhotos(null)).toEqual([]);
    expect(sortPhotos(undefined)).toEqual([]);
    expect(sortPhotos('nope' as unknown as Photo[])).toEqual([]);
  });

  it('sorts by likes descending by default', () => {
    expect(sortPhotos(photos).map(p => p.id)).toEqual(['high', 'mid', 'low']);
  });

  it('sorts by likes ascending when requested', () => {
    expect(sortPhotos(photos, 'likes', 'asc').map(p => p.id)).toEqual(['low', 'mid', 'high']);
  });

  it('sorts by title using locale comparison', () => {
    expect(sortPhotos(photos, 'title', 'asc').map(p => p.title)).toEqual(['Alpha', 'Beta', 'Gamma']);
  });

  it('does not mutate the original array', () => {
    const original = [...photos];
    sortPhotos(photos, 'likes', 'asc');
    expect(photos).toEqual(original);
  });

  it('pushes photos with a missing sort value to the end', () => {
    const withMissing = [
      makePhoto({ id: 'a', likes: 5 }),
      makePhoto({ id: 'b', likes: undefined as unknown as number }),
      makePhoto({ id: 'c', likes: 15 }),
    ];
    const result = sortPhotos(withMissing, 'likes', 'desc');
    expect(result[result.length - 1].id).toBe('b');
  });
});

describe('paginatePhotos', () => {
  const items = Array.from({ length: 9 }, (_, i) => i + 1);

  it('returns an empty result for null, undefined, or empty input', () => {
    for (const input of [null, undefined, []]) {
      const result = paginatePhotos(input as number[] | null | undefined, 1, 6);
      expect(result.items).toEqual([]);
      expect(result.totalItems).toBe(0);
      expect(result.totalPages).toBe(0);
      expect(result.hasMore).toBe(false);
    }
  });

  it('returns the first page and reports that more pages exist', () => {
    const result = paginatePhotos(items, 1, 6);
    expect(result.items).toEqual([1, 2, 3, 4, 5, 6]);
    expect(result.totalItems).toBe(9);
    expect(result.totalPages).toBe(2);
    expect(result.currentPage).toBe(1);
    expect(result.hasMore).toBe(true);
  });

  it('returns the final partial page with hasMore false', () => {
    const result = paginatePhotos(items, 2, 6);
    expect(result.items).toEqual([7, 8, 9]);
    expect(result.hasMore).toBe(false);
  });

  it('returns empty items for a page beyond the range', () => {
    const result = paginatePhotos(items, 3, 6);
    expect(result.items).toEqual([]);
    expect(result.totalItems).toBe(9);
    expect(result.totalPages).toBe(2);
    expect(result.hasMore).toBe(false);
  });

  it('returns empty items for a page below 1', () => {
    expect(paginatePhotos(items, 0, 6).items).toEqual([]);
  });

  it('clamps perPage to a minimum of 1', () => {
    const result = paginatePhotos(items, 1, 0);
    expect(result.items).toEqual([1]);
    expect(result.totalPages).toBe(9);
  });
});

describe('calculateGalleryStats', () => {
  it('returns zeroed stats for null, undefined, or empty input', () => {
    for (const input of [null, undefined, []]) {
      expect(calculateGalleryStats(input as Photo[] | null | undefined)).toEqual({
        totalPhotos: 0,
        totalLikes: 0,
        totalDownloads: 0,
        totalViews: 0,
        mostPopularTag: null,
        topPhotographer: null,
      });
    }
  });

  it('aggregates totals, most popular tag, and top photographer', () => {
    const photos: Photo[] = [
      makePhoto({ id: 'a', tags: ['Nature', 'Sky'], likes: 10, downloads: 2, views: 100, photographer: 'Ann' }),
      makePhoto({ id: 'b', tags: ['nature'], likes: 5, downloads: 1, views: 50, photographer: 'Bob' }),
      makePhoto({ id: 'c', tags: ['NATURE', 'sky'], likes: 20, downloads: 3, views: 200, photographer: 'Ann' }),
    ];
    expect(calculateGalleryStats(photos)).toEqual({
      totalPhotos: 3,
      totalLikes: 35,
      totalDownloads: 6,
      totalViews: 350,
      mostPopularTag: 'nature',
      topPhotographer: 'Ann',
    });
  });

  it('counts tags case-insensitively and trims photographer names', () => {
    const photos: Photo[] = [
      makePhoto({ id: 'a', tags: ['a'], likes: 4, photographer: undefined }),
      makePhoto({ id: 'b', tags: [], likes: 6, photographer: '  Zed  ' }),
    ];
    const stats = calculateGalleryStats(photos);
    expect(stats.topPhotographer).toBe('Zed');
    expect(stats.mostPopularTag).toBe('a');
    expect(stats.totalLikes).toBe(10);
  });

  it('ignores null entries without throwing', () => {
    const photos = [
      makePhoto({ id: 'a', tags: ['x'], likes: 3, photographer: 'Ann' }),
      null,
      makePhoto({ id: 'b', tags: ['x'], likes: 7, photographer: 'Ann' }),
    ] as unknown as Photo[];
    const stats = calculateGalleryStats(photos);
    expect(stats.totalLikes).toBe(10);
    expect(stats.mostPopularTag).toBe('x');
    expect(stats.topPhotographer).toBe('Ann');
    // totalPhotos reflects the raw array length, including null entries.
    expect(stats.totalPhotos).toBe(3);
  });
});

describe('integration with the mock dataset', () => {
  it('produces consistent stats and pagination over mockPhotos', () => {
    const stats = calculateGalleryStats(mockPhotos);
    expect(stats.totalPhotos).toBe(mockPhotos.length);
    expect(stats.totalLikes).toBeGreaterThan(0);

    const page = paginatePhotos(mockPhotos, 1, 6);
    expect(page.items).toHaveLength(6);
    expect(page.hasMore).toBe(true);
  });
});
