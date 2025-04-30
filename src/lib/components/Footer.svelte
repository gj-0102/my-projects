<footer>
  <div class="footer-content">
    <div class="footer-section">
      <h3>Fast Food Tracking</h3>
      <p>Track your food delivery easily and stay updated with real-time delivery status.</p>
    </div>

    <div class="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/orders">Orders</a></li>
      </ul>
    </div>

    <div class="footer-section">
      <h3>Contact Us</h3>
      <p>Email: contact@foodtracking.hu</p>
      <p>Phone: +36 1 234 5678</p>
    </div>
  </div>

  <div class="footer-bottom">
    <p>© {new Date().getFullYear()} Fast Food Delivery Tracking System. All rights reserved.</p>
  </div>
</footer>

<style lang="scss">
  footer {
    background-color: #f8f9fa;
    padding: 2rem 0;
    margin-top: auto;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 0 1rem;
  }

  .footer-section h3 {
    color: #333;
    margin-bottom: 1rem;
  }

  .footer-section ul {
    list-style: none;
    padding: 0;
  }

  .footer-section ul li {
    margin-bottom: 0.5rem;
  }

  .footer-section a {
    color: #666;
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-section a:hover {
    color: #ff4b4b;
  }

  .footer-bottom {
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #ddd;
  }

  .footer-bottom p {
    color: #666;
  }

  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }
</style>