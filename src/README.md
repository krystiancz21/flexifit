# FlexiFit - System Zarządzania Siłownią

FlexiFit to aplikacja backendowa oparta na Spring Boot, służąca do zarządzania centrum fitness. System obsługuje uwierzytelnianie użytkowników, zakup karnetów oraz rezerwacje zajęć grupowych.

## Główne Funkcjonalności

### System Uwierzytelniania
- Autoryzacja oparta na tokenach JWT
- Rejestracja i logowanie użytkowników
- System uprawnień (USER, ADMIN)
- Bezpieczne przechowywanie haseł 

### Zarządzanie Karnetami
- Pełna obsługa CRUD dla karnetów
- Różne typy karnetów siłownia, zajęcia grupowe, basen, pełny dostęp
- Możliwość dodawania zdjęć do karnetów
- System zakupu karnetów

### Zajęcia Grupowe
- Pełna obsługa CRUD dla zajęć grupowych
- Zarządzanie limitem miejsc
- System rezerwacji zajęć
- Zarządzanie harmonogramem zajęć

### Bezpieczeństwo
- Implementacja Spring Security
- Walidacja tokenów JWT
- Konfiguracja CORS
- Globalna obsługa błędów

## Struktura Projektu
Projekt jest podzielony na moduły odpowiedzialne za:
- Uwierzytelnianie (auth)
- Konfigurację (config)
- Obsługę błędów (exception)
- Zarządzanie zajęciami grupowymi (groupclass)
- Usługi wspólne (service)
- Zarządzanie karnetami (ticket)
- Zarządzanie użytkownikami (user)

Każdy moduł zawiera odpowiednie kontrolery, serwisy i encje potrzebne do realizacji swojej funkcjonalności.