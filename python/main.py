from skimage.metrics import structural_similarity
import cv2
import numpy as np
from PIL import Image
import io
import json

from flask import Flask, request, jsonify
app = Flask(__name__)


class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


def compareImage(first, second):

    if not first or not second:
        return False
    try:
        first = first['data']
        second = second['data']

        first = bytes(first)
        second = bytes(second)

        first = Image.open(io.BytesIO(first))
        second = Image.open(io.BytesIO(second))

        first = np.asarray(first)
        second = np.asarray(second)

        first_gray = cv2.cvtColor(first, cv2.COLOR_BGR2GRAY)
        second_gray = cv2.cvtColor(second, cv2.COLOR_BGR2GRAY)

        score, diff = structural_similarity(first_gray, second_gray, full=True)
        print("Similarity Score: {:.3f}%".format(score * 100))

        diff = (diff * 255).astype("uint8")

        thresh = cv2.threshold(
            diff, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]
        contours = cv2.findContours(
            thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        contours = contours[0] if len(contours) == 2 else contours[1]

        mask = np.zeros(first.shape, dtype='uint8')
        filled = second.copy()

        for c in contours:
            area = cv2.contourArea(c)
            if area > 5:
                x, y, w, h = cv2.boundingRect(c)
                cv2.rectangle(first, (x, y), (x + w, y + h), (36, 255, 12), 2)
                cv2.rectangle(second, (x, y), (x + w, y + h), (36, 255, 12), 2)
                cv2.drawContours(mask, [c], 0, (0, 255, 0), -1)
                cv2.drawContours(filled, [c], 0, (0, 255, 0), -1)

        return json.dumps(diff, cls=NumpyEncoder)
    except Exception as e:
        print("Unexpected error:", e)
        return "Internal Error "


@ app.route('/process_data', methods=['POST'])
def process_data():
    try:
        data = request.get_json()
        image1 = data.get('image1')
        image2 = data.get('image2')
        if (not image1 or not image2):
            return "images are not provided"
        return {'result': compareImage(image1, image2)}
    except Exception as e:
        print("Unexpected error:", e)
        return {"error": True}


if __name__ == '__main__':
    app.run(debug=True)

    # cv2.imshow('sum', sum)
    # # cv2.imshow('first', first)
    # # cv2.imshow('second', second)
    # # cv2.imshow('diff', diff)
    # # cv2.imshow('mask', mask)
    # # cv2.imshow('filled', filled)
    # cv2.waitKey()
