# Test environment for frontend nodejs apps
FROM node:18

WORKDIR /home

RUN useradd --system ${uid+--uid "$uid"} --user-group --shell /sbin/nologin --create-home --home-dir /home builder \
  && chown -R builder:builder /home

USER builder
