### CLICK NEXT PAGE
```
  const nextPage = useCallback(() => {
        const route = `/u/prod_mgmt/pdsfc_work_report`;

        const isElectron = window?.electron?.openRoute !== undefined;

        if (isElectron) {
            window.electron.openRoute(route);
        } else {
            window.open(route, '_blank');
        }
        localStorage.setItem('COLLAPSED_STATE', JSON.stringify(true));
    }, []);

```

UPDATE "_ERPUser_WEB"
SET "UserName" = CASE "UserSeq"
    WHEN 1 THEN 'admin'
    ELSE "UserId"
END
WHERE "UserSeq" IN (1);
