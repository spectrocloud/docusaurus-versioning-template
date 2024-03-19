FROM node:18

RUN apt update -y && apt upgrade -y && \
groupadd -r appuser && useradd -r -g appuser -m appuser

COPY --chown=appuser:appuser . /app 

WORKDIR /app

RUN make init && \
echo "[credential]" >> /home/appuser/.gitconfig \
&& echo "    helper = store" >> /home/appuser/.gitconfig \
&& echo "[url \"https://github.com/\"]" >> /home/appuser/.gitconfig \
&& echo "    insteadOf = git@github.com:" >> /home/appuser/.gitconfig


USER appuser

EXPOSE 3000