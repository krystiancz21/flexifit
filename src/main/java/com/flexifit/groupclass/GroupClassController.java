package com.flexifit.groupclass;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/group-classes")
@RequiredArgsConstructor
public class GroupClassController {

    private final GroupClassService groupClassService;

    @GetMapping
    public ResponseEntity<List<GroupClass>> getAllGroupClasses() {
        List<GroupClass> groupClasses = groupClassService.getAllGroupClasses();
        return ResponseEntity.ok(groupClasses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupClass> getGroupClassById(@PathVariable Long id) {
        return groupClassService.getGroupClassById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createGroupClass(@Valid @RequestBody GroupClass groupClass, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        GroupClass createdGroupClass = groupClassService.createGroupClass(groupClass);
        return ResponseEntity.ok(createdGroupClass);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateGroupClass(
            @PathVariable Long id,
            @Valid @RequestBody GroupClass groupClassDetails,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        return groupClassService.updateGroupClass(id, groupClassDetails)
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Element o ID: " + id + " nie istnieje"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGroupClass(@PathVariable Long id) {
        if (groupClassService.deleteGroupClass(id)) {
            return ResponseEntity.ok("Usunięto element o ID: " + id);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Element o ID: " + id + " nie istnieje");
    }
} 