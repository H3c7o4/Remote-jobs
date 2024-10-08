import re

def extract_text_before_html(text):
    """
    Extrait le texte jusqu'à la première balise HTML.
    """
    # Utiliser une expression régulière pour capturer tout le texte avant la première balise HTML
    match = re.search(r'(<[^>]+>)', text)
    if match:
        return text[:match.start()]
    return text