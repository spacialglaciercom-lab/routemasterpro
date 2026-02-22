const PrivacyPolicy = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return (
    <div className="min-h-screen bg-[#F4F2EE] text-[#111111]">
      <header className="border-b border-[#E5E2DD] bg-[#F4F2EE]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-display font-bold text-lg text-[#111111]">
            RouteMaster Pro
          </a>
          <a
            href={baseUrl + '/#contact'}
            className="text-sm font-medium text-[#6F6F6F] hover:text-[#111111]"
          >
            Contact
          </a>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-20">
        <h1 className="font-display font-bold text-2xl sm:text-3xl mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#6F6F6F] mb-8">
          Last updated: February 2026 · RouteMasterPro
        </p>

        <p className="mb-6 leading-relaxed">
          RouteMasterPro (&quot;we,&quot; &quot;our,&quot; or &quot;the app&quot;) is a mobile and web application for planning and optimizing trash collection routes. This Privacy Policy explains what information we collect, how we use it, and your choices.
        </p>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-lg mb-3">1. Information We Collect</h2>
          <h3 className="font-medium text-[#111111] mb-2">1.1 Information you provide</h3>
          <ul className="list-disc pl-6 space-y-1 text-[#333] mb-4">
            <li><strong>Account (optional):</strong> If you sign in (e.g., Sign in with Apple), we receive an identifier and, if you choose to share it, your name and email. We do not store your Apple password.</li>
            <li><strong>Routes and data you create:</strong> Saved routes, collection points, OSM imports, and preferences are stored on your device and, if you use cloud or sync features, on our or our providers&apos; servers.</li>
            <li><strong>Support:</strong> If you contact us, we may keep your email and message content to respond and improve support.</li>
          </ul>
          <h3 className="font-medium text-[#111111] mb-2">1.2 Information collected automatically</h3>
          <ul className="list-disc pl-6 space-y-1 text-[#333] mb-4">
            <li><strong>Device and app:</strong> Device type, OS version, app version, and language to support compatibility and updates.</li>
            <li><strong>Location:</strong> When you use mapping, routing, or weather features, we use your location. You can deny or revoke location in your device settings.</li>
            <li><strong>Usage and diagnostics:</strong> We may collect anonymous or pseudonymous usage data and crash reports to fix bugs and improve the app.</li>
          </ul>
          <h3 className="font-medium text-[#111111] mb-2">1.3 Sensors</h3>
          <p className="text-[#333]">Microphone and camera are used only when you use voice/AI or camera-based features (e.g. Mapillary). Maps and routing may send coordinates to third-party services.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-lg mb-3">2. How We Use Information</h2>
          <p className="text-[#333] mb-2">We use the information to provide and improve the app, operate sign-in and account features, debug crashes, and comply with law. We do not sell your personal information.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-lg mb-3">3. Third-Party Services</h2>
          <p className="text-[#333] mb-2">The app uses Apple (Sign in with Apple), Google/Firebase (maps, analytics, crash reporting), Mapbox, OpenStreetMap and tile providers, weather and routing APIs, and possibly AI/chat providers. Each has its own privacy policy; we recommend reviewing them.</p>
          <ul className="list-disc pl-6 text-[#333] text-sm">
            <li><a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#111111] underline">Apple Privacy Policy</a></li>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#111111] underline">Google Privacy Policy</a></li>
            <li><a href="https://www.mapbox.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[#111111] underline">Mapbox Privacy Policy</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-lg mb-3">4. Data Retention and Storage</h2>
          <p className="text-[#333]">On-device data stays until you clear app data or uninstall. Server/cloud data is retained while your account is active or as needed for support and legal obligations, then deleted or anonymized. Logs and diagnostics are kept only as long as necessary.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-lg mb-3">5. Your Rights and Choices</h2>
          <p className="text-[#333] mb-2">You can turn off location in device settings, sign out or delete your account where offered, and request access, correction, or deletion of your data by contacting us. In the EEA/UK you may have additional rights (e.g. portability, objection, complaint to a supervisor).</p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-lg mb-3">6. Children</h2>
          <p className="text-[#333]">The app is not directed at children under 13 (or higher where required). We do not knowingly collect personal information from children. If you believe a child has provided us data, contact us and we will delete it.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-lg mb-3">7. Security</h2>
          <p className="text-[#333]">We use reasonable measures to protect your data. No system is completely secure; we cannot guarantee absolute security.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-lg mb-3">8. Changes to This Policy</h2>
          <p className="text-[#333]">We may update this policy and will post the updated version with a new &quot;Last updated&quot; date. Continued use after changes constitutes acceptance. For material changes, we may notify you in the app or by email.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-lg mb-3">9. Contact</h2>
          <p className="text-[#333]">For privacy-related questions, requests, or complaints, use the support or contact option in RouteMasterPro or on this website (e.g. the Contact section).</p>
        </section>

        <p className="text-sm text-[#6F6F6F]">
          © 2026 RouteMaster Pro. All rights reserved.
        </p>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
