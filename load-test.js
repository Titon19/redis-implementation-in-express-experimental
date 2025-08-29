import http from "k6/http"
import { check, sleep } from "k6"

export let options = {
  vus: 100, // 1000 virtual users
  duration: "10s", // jalankan test selama 10 detik
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% request harus < 200ms
  },
}

export default function () {
  const res = http.get("http://localhost:5000/api/v1/posts")

  check(res, {
    "status is 200": (r) => r.status === 200,
    "body not empty": (r) => r.body.length > 0,
  })

  sleep(1) // jeda 1 detik antar request per VU
}
