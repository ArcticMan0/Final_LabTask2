// context/students-context.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { STUDENTS } from "../data/students";
import { StudentsAction, StudentsState, studentsReducer } from "./students-reducer";

interface StudentsContextValue {
    students: StudentsState;
    dispatch: React.Dispatch<StudentsAction>;
    isLoading: boolean;
}

const StudentsContext = createContext<StudentsContextValue | null>(null);

const STORAGE_KEY = "@student_directory";

export function StudentsProvider({ children }: { children: React.ReactNode }) {
    const [students, dispatch] = useReducer(studentsReducer, STUDENTS);
    const [isLoading, setIsLoading] = useState(true);

    // ── LOAD: read saved data from disk on mount ──────────
    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY)
            .then((raw) => {
                if (raw) {
                    const saved = JSON.parse(raw) as StudentsState;
                    dispatch({ type: "LOAD", payload: saved });
                }
            })
            .catch((err) => console.error("AsyncStorage load error:", err))
            .finally(() => setIsLoading(false));
    }, []); // [] — run once on mount only

    // ── SAVE: write to disk whenever students changes ─────
    useEffect(() => {
        // Skip saving during the initial load phase
        if (isLoading) return;

        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(students)).catch((err) =>
            console.error("AsyncStorage save error:", err)
        );
    }, [students]); // re-run every time students changes

    return (
        <StudentsContext.Provider value={{ students, dispatch, isLoading }}>
            {children}
        </StudentsContext.Provider>
    );
}

export function useStudents(): StudentsContextValue {
    const ctx = useContext(StudentsContext);
    if (!ctx) {
        throw new Error("useStudents must be used inside a StudentsProvider");
    }
    return ctx;
}
