# Infrastructure

## Commands

### Start (or restart) all containers

```bash
docker-compose up -d
```

### Stop and remove all containers including volumes

```bash
docker-compose down -v
```

### Remove all containers, explicitly

```bash
docker rm -f ${APP_NAME}_postgres ${APP_NAME}_pgadmin
```

### Remove all volumes, explicitly

```bash
docker volume rm infra_postgres_data infra_pgadmin_data
```

### Verify all volumes are gone

```bash
docker volume ls
```

### Remove all dangling volumes

```bash
docker volume prune
```

## Additional Commands

### Check port usage

```bash
MacOS: `sudo lsof -i -P | grep LISTEN | grep :${PORT}`
```
