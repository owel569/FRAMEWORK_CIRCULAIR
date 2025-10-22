
#!/usr/bin/env python3
import sys
try:
    from docx import Document
    
    def extract_text(docx_path):
        doc = Document(docx_path)
        text = "\n".join([para.text for para in doc.paragraphs])
        return text
    
    if __name__ == "__main__":
        if len(sys.argv) < 2:
            print("Usage: python extract_docx.py <docx_path>")
            sys.exit(1)
        
        docx_path = sys.argv[1]
        print(extract_text(docx_path))
except ImportError:
    print("Erreur: python-docx non installé. Installez avec: pip install python-docx")
    sys.exit(1)
