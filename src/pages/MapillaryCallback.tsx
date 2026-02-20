/**
 * Mapillary OAuth callback page for routemasterpro.ca.
 * Mapillary redirects here after sign-in (e.g. from the TrashRoute app).
 * This page is only shown briefly; the in-app browser returns the URL to the app.
 */
export function MapillaryCallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F4F2EE] text-center">
      <h1 className="text-xl font-semibold mb-2">Sign-in complete</h1>
      <p className="text-neutral-600">You can close this window and return to the app.</p>
    </div>
  );
}
