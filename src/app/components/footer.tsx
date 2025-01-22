const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">Get in Touch</p>
          </div>
          <div className="flex space-x-4">
            <FooterLink href="https://twitter.com/emrekasgur" label="Twitter" />
            <FooterLink href="https://github.com/emrekasg" label="GitHub" />
            <FooterLink href="https://linkedin.com/in/emrekasgur" label="LinkedIn" />
          </div>
        </div>
      </div>
    </footer>
  )
}

const FooterLink = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-muted-foreground hover:text-primary transition-colors"
  >
    {label}
  </a>
)

export default Footer

