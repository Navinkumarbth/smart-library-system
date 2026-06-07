function Footer() {
  return (
    <footer className="h-12 px-6 flex items-center justify-between text-xs text-gray-500 bg-white border-t">
      <p>© {new Date().getFullYear()} BookWorm Library</p>
      <p>Built with React &amp; TailwindCSS</p>
    </footer>
  );
}

export default Footer;


