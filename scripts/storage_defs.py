from scripts import on_disk_drugs_storage, on_disk_support_icons_storage, jinja_footnotes, storage


class Storage:
    def __init__(self):
        self._drugs = on_disk_drugs_storage.OnDiskDrugStorage()
        self._footnotes = jinja_footnotes.JinjaFootnotesStorage()
        self._support_icons = on_disk_support_icons_storage.OnDiskSupportIconsStorage()

    def drugs(self) -> storage.DrugsStorage:
        return self._drugs

    def footnotes(self) -> storage.FootnotesStorage:
        return self._footnotes

    def support_icons(self) -> storage.SupportIconsStorage:
        return self._support_icons