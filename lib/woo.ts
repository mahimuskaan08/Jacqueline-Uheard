// lib/woo.ts
// ─────────────────────────────────────────────────────────────────────────────
// SERVER-ONLY WooCommerce REST API v3 client.
// ⚠️  Never import this file in any 'use client' component.
//     WC_CONSUMER_KEY and WC_CONSUMER_SECRET are only available server-side.
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ────────────────────────────────────────────────────────────────────

export type WcProductImage = {
  id: number;
  src: string;
  name: string;
  alt: string;
};

export type WcProduct = {
  id: number;
  name: string;
  slug: string;
  status: string;
  price: string;           // current price (sale price when on sale)
  regular_price: string;
  sale_price: string;      // empty string when not on sale
  on_sale: boolean;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity: number | null;
  images: WcProductImage[];
};

export type WcOrder = {
  id: number;
  order_key: string;
  status: string;
};

// ── Environment config ────────────────────────────────────────────────────────
// All three values come from .env.local — never hardcoded, never exposed.

/** WooCommerce site base URL — set WC_URL in .env.local */
const WC_URL = process.env.WC_URL ?? '';

/** WooCommerce REST Consumer Key — set WC_CONSUMER_KEY in .env.local */
const WC_KEY = process.env.WC_CONSUMER_KEY ?? '';

/** WooCommerce REST Consumer Secret — set WC_CONSUMER_SECRET in .env.local */
const WC_SECRET = process.env.WC_CONSUMER_SECRET ?? '';

// ── Core fetch wrapper ────────────────────────────────────────────────────────

/**
 * Authenticated fetch against the WooCommerce REST API v3.
 *
 * Credentials are sent via HTTP Basic Auth (key:secret in base64).
 * They exist only in this server-side function — the browser never sees them.
 *
 * @param path  API path relative to /wp-json/wc/v3  e.g. '/products'
 * @param init  Standard RequestInit (method, body, etc.)
 */
export async function wcFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!WC_URL || !WC_KEY || !WC_SECRET) {
    throw new Error(
      'WooCommerce credentials missing. ' +
      'Set WC_URL, WC_CONSUMER_KEY, and WC_CONSUMER_SECRET in .env.local',
    );
  }

  // HTTP Basic Auth: base64(consumerKey:consumerSecret)
  const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');

  const res = await fetch(`${WC_URL}/wp-json/wc/v3${path}`, {
    ...init,
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    // no-store so prices/stock are always live; add revalidate once stable
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '(no body)');
    throw new Error(`WC API ${res.status} on ${path}: ${body}`);
  }

  return res.json() as Promise<T>;
}

// ── Helper functions ──────────────────────────────────────────────────────────

/** Fetch all published products (up to 100). */
export function getProducts(): Promise<WcProduct[]> {
  return wcFetch<WcProduct[]>('/products?per_page=100&status=publish');
}

/** Fetch a single product by its WooCommerce product ID. */
export function getProductById(id: number): Promise<WcProduct> {
  return wcFetch<WcProduct>(`/products/${id}`);
}

/**
 * Create a pending WooCommerce order for checkout handoff.
 * Used when the cart contains more than one distinct product.
 * The customer completes billing & payment on the WooCommerce order-pay page.
 */
export function createPendingOrder(
  lineItems: Array<{ product_id: number; quantity: number }>,
): Promise<WcOrder> {
  return wcFetch<WcOrder>('/orders', {
    method: 'POST',
    body: JSON.stringify({
      status: 'pending',
      // WooCommerce product IDs come from lib/woo-product-map (wcId field)
      line_items: lineItems,
    }),
  });
}

/** Returns the WooCommerce site base URL. */
export function getWcUrl(): string {
  return WC_URL;
}
