import base64
import json

jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wdHFtcnlvcnpscnduY29tcWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMDk3MjksImV4cCI6MjA4ODg4NTcyOX0.xvHuQMbka988qNIK5Bp4iAxOgQfqKTx6KP92eoDkL3U"
payload = jwt.split(".")[1]
# Add padding
payload += "=" * ((4 - len(payload) % 4) % 4)
decoded = base64.b64decode(payload).decode("utf-8")
print(decoded)
