from fpdf import FPDF
import os
from datetime import datetime

from app.config import REPORT_DIR


def generate_report(prediction_data):
    filename = f"report_{datetime.now().strftime('%Y%m%d%H%M%S')}.pdf"
    filepath = os.path.join(REPORT_DIR, filename)

    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # Title
    pdf.set_font("Arial", "B", 18)
    pdf.cell(
        190,
        12,
        "Oral Cancer Detection Report",
        ln=True,
        align="C"
    )

    pdf.ln(10)

    # Result details
    pdf.set_font("Arial", "", 13)

    pdf.cell(
        190,
        10,
        f"Prediction: {prediction_data['prediction']}",
        ln=True
    )

    pdf.cell(
        190,
        10,
        f"Confidence: {prediction_data['confidence']}%",
        ln=True
    )

    pdf.cell(
        190,
        10,
        f"Generated On: {datetime.now().strftime('%d-%m-%Y %H:%M:%S')}",
        ln=True
    )

    pdf.ln(8)

    # Recommendation heading
    pdf.set_font("Arial", "B", 14)
    pdf.cell(190, 10, "Medical Recommendations:", ln=True)

    pdf.ln(3)

    # Recommendations
    pdf.set_font("Arial", "", 12)

    for rec in prediction_data["recommendation"]:
        pdf.cell(10, 8, "-", ln=0)
        pdf.multi_cell(
            175,
            8,
            rec
        )

    pdf.output(filepath)

    return filename