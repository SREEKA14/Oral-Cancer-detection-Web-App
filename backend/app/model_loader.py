import os
import json
import pickle
import torch
import timm
import torch.nn as nn

from app.config import MODEL_DIR

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"


def load_model(model_name):
    model_map = {
        "efficientnet_b4": "efficientnet_b4",
        "densenet201": "densenet201",
        "inception_v3": "inception_v3",
        "swin_transformer": "swin_base_patch4_window7_224"
    }

    architecture = model_map[model_name]

    model = timm.create_model(
        architecture,
        pretrained=False,
        num_classes=1
    )

    path = os.path.join(MODEL_DIR, f"{model_name}.pth")

    state_dict = torch.load(
        path,
        map_location=DEVICE
    )

    model.load_state_dict(state_dict)

    model.to(DEVICE)
    model.eval()

    return model


print("Loading models...")

efficientnet = load_model("efficientnet_b4")
densenet = load_model("densenet201")
inception = load_model("inception_v3")
swin = load_model("swin_transformer")

print("Models loaded")


with open(os.path.join(MODEL_DIR, "ensemble.pkl"), "rb") as f:
    ensemble = pickle.load(f)

weights = ensemble["weights"]

with open(os.path.join(MODEL_DIR, "class_map.json"), "r") as f:
    class_map = json.load(f)

print("Ensemble loaded")