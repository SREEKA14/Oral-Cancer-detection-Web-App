import os
import numpy as np
from PIL import Image

import torch
from torchvision import transforms

from app.model_loader import (
    efficientnet,
    densenet,
    inception,
    swin,
    weights,
    DEVICE
)


transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std=[0.229,0.224,0.225]
    )
])


def preprocess_image(image_path):
    image = Image.open(image_path).convert("RGB")
    tensor = transform(image).unsqueeze(0)
    return tensor.to(DEVICE)


def predict_oral_cancer(image_path):
    image = preprocess_image(image_path)

    with torch.no_grad():
        p1 = torch.sigmoid(efficientnet(image)).item()
        p2 = torch.sigmoid(densenet(image)).item()
        p3 = torch.sigmoid(inception(image)).item()
        p4 = torch.sigmoid(swin(image)).item()

    final_prob = (
        weights[0]*p1 +
        weights[1]*p2 +
        weights[2]*p3 +
        weights[3]*p4
    )

    prediction = "CANCER" if final_prob > 0.5 else "NON CANCER"
    confidence = round(final_prob * 100, 2)

    if prediction == "CANCER":
        recommendation = [
            "Consult oncologist immediately",
            "Biopsy recommended",
            "Schedule further screening",
            "Avoid tobacco and alcohol"
        ]
    else:
        recommendation = [
            "Maintain oral hygiene",
            "Regular dental checkups",
            "Avoid tobacco products",
            "Healthy diet recommended"
        ]

    return {
        "prediction": prediction,
        "confidence": confidence,
        "recommendation": recommendation
    }