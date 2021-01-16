
## Dataset
Dataset: [Google Drive](https://drive.google.com/open?id=16dhJn7k4FWVwByRsQAEpl9lwjuV03jVI)

## Prerequisites
We strongly recommend Anaconda as the environment.

Python: 2.7

PyTorch: 0.4.0

CUDA: 9.2
## Ground Truth

Please follow the `make_dataset.ipynb ` to generate the ground truth. It shall take some time to generate the dynamic ground truth. Note you need to generate your own json file.

## Training Process

Try `python train.py train.json val.json 0 0` to start training process.

## Validation

Follow the `val.ipynb` to try the validation. You can try to modify the notebook and see the output of each image.


