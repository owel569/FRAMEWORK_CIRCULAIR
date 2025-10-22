
import pdfplumber
import os

# Chemin vers le dossier des PDFs
pdf_folder = "attached_assets"

# Trouver tous les fichiers PDF
pdf_files = [f for f in os.listdir(pdf_folder) if f.endswith('.pdf')]

print(f"📄 Trouvé {len(pdf_files)} fichiers PDF\n")

for pdf_file in pdf_files:
    pdf_path = os.path.join(pdf_folder, pdf_file)
    output_path = pdf_path.replace('.pdf', '_extracted.txt')
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            full_text = ""
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    full_text += text + "\n\n"
            
            # Sauvegarder le texte extrait
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(full_text)
            
            print(f"✅ Extrait : {pdf_file}")
            print(f"   Sauvegardé dans : {output_path}")
            print(f"   Longueur : {len(full_text)} caractères\n")
    
    except Exception as e:
        print(f"❌ Erreur avec {pdf_file}: {str(e)}\n")

print("🎉 Extraction terminée !")
