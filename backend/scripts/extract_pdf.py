
#!/usr/bin/env python3
import sys
try:
    from pypdf import PdfReader
    
    def extract_text(pdf_path):
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    
    if __name__ == "__main__":
        if len(sys.argv) < 2:
            print("Usage: python extract_pdf.py <pdf_path>")
            sys.exit(1)
        
        pdf_path = sys.argv[1]
        print(extract_text(pdf_path))
except ImportError:
    print("Erreur: pypdf non installé. Installez avec: pip install pypdf")
    sys.exit(1)
