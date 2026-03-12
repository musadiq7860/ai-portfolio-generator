FROM python:3.10-slim

# Install system dependencies for WeasyPrint
RUN apt-get update && apt-get install -y \
    libpango-1.0-0 \
    libharfbuzz0b \
    libpangoft2-1.0-0 \
    libpangocairo-1.0-0 \
    libcairo2 \
    libffi-dev \
    shared-mime-info \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /code

COPY ./app/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
