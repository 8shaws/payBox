FROM golang:1.21

# Set destination for COPY
WORKDIR /base

COPY ["backend/mote", "./backend/mote"]

RUN cd /base/backend/mote
RUN make deps
RUN make build


# Expose
EXPOSE 8085

WORKDIR /base/backend/mote

CMD ["make", "dev"]